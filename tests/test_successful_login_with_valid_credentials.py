import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


@pytest.fixture(scope="function")
def setup_browser():
    """
    Setup the Chrome WebDriver.
    """
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.maximize_window()
    yield driver
    driver.quit()


def test_successful_login_with_valid_credentials(setup_browser):
    """
    Test Case: Successful Login with Valid Credentials (Web - Chrome)
    """
    driver = setup_browser

    # Step 1: Open Chrome browser (Handled by WebDriver setup)

    # Step 2: Navigate to the login page URL
    login_url = "https://practicetestautomation.com/practice-test-login"
    driver.get(login_url)

    # Assertion: Verify login page is displayed
    assert driver.current_url == login_url, "Login page URL mismatch"

    # Step 3: Enter a valid email address in the email field
    username_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "#username"))
    )
    username_field.send_keys("valid_username")

    # Step 4: Enter the correct password for the valid user in the password field
    password_field = driver.find_element(By.CSS_SELECTOR, "#password")
    password_field.send_keys("valid_password")

    # Step 5: Click the login button
    login_button = driver.find_element(By.CSS_SELECTOR, "#submit")
    login_button.click()

    # Step 6: Observe the page after clicking the login button
    # Step 7: Verify the dashboard content
    dashboard_url = "https://practicetestautomation.com/logged-in-successfully"
    WebDriverWait(driver, 10).until(EC.url_to_be(dashboard_url))

    # Assertion: Verify the user is redirected to the dashboard page
    assert driver.current_url == dashboard_url, "Dashboard URL mismatch"

    # Assertion: Verify the dashboard displays user-specific information
    dashboard_content = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "h1"))
    )
    assert "Logged In Successfully" in dashboard_content.text, "Dashboard content mismatch"
