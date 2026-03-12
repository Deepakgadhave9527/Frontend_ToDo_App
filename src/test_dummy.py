import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Test data
BASE_URL = "https://practicetestautomation.com/practice-test-login"
USERNAME = "test_user"
PASSWORD = "correct_password"
DASHBOARD_URL = "https://practicetestautomation.com/logged-in-successfully"

@pytest.fixture(scope="function")
def setup_teardown():
    # Setup WebDriver
    driver = webdriver.Chrome()
    driver.maximize_window()
    yield driver
    # Teardown WebDriver
    driver.quit()

def test_initiate_ride_request_successful(setup_teardown):
    driver = setup_teardown

    # Step 1: Navigate to the login page
    driver.get(BASE_URL)
    assert driver.current_url == BASE_URL, "Failed to load the login page."

    # Step 2: Enter username
    username_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "#username"))
    )
    username_field.send_keys(USERNAME)

    # Step 3: Enter password
    password_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "#password"))
    )
    password_field.send_keys(PASSWORD)

    # Step 4: Click the login button
    login_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "#submit"))
    )
    login_button.click()

    # Step 5: Verify successful navigation to the dashboard
    WebDriverWait(driver, 10).until(
        EC.url_to_be(DASHBOARD_URL)
    )
    assert driver.current_url == DASHBOARD_URL, "Failed to navigate to the dashboard."

    # Step 6: Additional assertions (if applicable)
    # Example: Check if the user is logged in (mock validation)
    assert "success" in driver.page_source.lower(), "Login success message not found."

# To run the test: Use the command `pytest <script_name>.py`