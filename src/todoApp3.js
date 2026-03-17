# Selenium Python Test Script for "Successful Login with Valid Credentials (Web - Chrome)"

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pytest

# Test Data
LOGIN_URL = "https://practicetestautomation.com/practice-test-login"
DASHBOARD_URL = "https://practicetestautomation.com/logged-in-successfully"
VALID_USERNAME = "testuser"
VALID_PASSWORD = "password123"

@pytest.fixture(scope="function")
def setup_browser():
    # Setup Chrome WebDriver
    driver = webdriver.Chrome()
    driver.maximize_window()
    yield driver
    # Teardown
    driver.quit()

def test_successful_login_with_valid_credentials(setup_browser):
    driver = setup_browser

    # Step 1: Open Chrome browser and navigate to the login page URL
    driver.get(LOGIN_URL)

    # Step 2: Verify the login page is displayed
    assert driver.current_url == LOGIN_URL, "Login page URL is incorrect."

    # Step 3: Enter a valid email address in the email field
    username_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "#username"))
    )
    username_field.send_keys(VALID_USERNAME)

    # Step 4: Enter the correct password for the valid user in the password field
    password_field = driver.find_element(By.CSS_SELECTOR, "#password")
    password_field.send_keys(VALID_PASSWORD)

    # Step 5: Click the login button
    login_button = driver.find_element(By.CSS_SELECTOR, "#submit")
    login_button.click()

    # Step 6: Observe the page after clicking the login button
    WebDriverWait(driver, 10).until(
        EC.url_to_be(DASHBOARD_URL)
    )

    # Step 7: Verify the dashboard content
    assert driver.current_url == DASHBOARD_URL, "Dashboard URL is incorrect after login."
    assert "Logged In Successfully" in driver.page_source, "Dashboard content is missing or incorrect."

    print("Test Passed: Successful Login with Valid Credentials (Web - Chrome)")