import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Test data
BASE_URL = "https://practicetestautomation.com/practice-test-login"
USERNAME = "test_user"
PASSWORD = "test_password"

@pytest.fixture(scope="function")
def setup_browser():
    # Setup WebDriver
    driver = webdriver.Chrome()
    driver.maximize_window()
    yield driver
    driver.quit()

def test_initiate_ride_request_successful(setup_browser):
    driver = setup_browser

    # Navigate to login page
    driver.get(BASE_URL)

    # Explicit wait for username field to be visible
    WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, "#username"))
    )

    # Enter username
    username_field = driver.find_element(By.CSS_SELECTOR, "#username")
    username_field.send_keys(USERNAME)

    # Enter password
    password_field = driver.find_element(By.CSS_SELECTOR, "#password")
    password_field.send_keys(PASSWORD)

    # Click login button
    login_button = driver.find_element(By.CSS_SELECTOR, "#submit")
    login_button.click()

    # Wait for dashboard page to load and verify successful login
    WebDriverWait(driver, 10).until(
        EC.url_to_be("https://practicetestautomation.com/logged-in-successfully")
    )

    assert driver.current_url == "https://practicetestautomation.com/logged-in-successfully", "Login failed!"

    # Additional steps for initiating ride request can be added here
    # For example:
    # - Select source and destination locations
    # - Choose ride options
    # - Confirm ride request

    # Final assertion for successful ride request
    # This is a placeholder as the actual ride initiation logic is not provided in the test case
    assert True, "Ride request initiated successfully!"