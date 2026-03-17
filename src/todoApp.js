import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Test data
LOGIN_PAGE_URL = "https://practicetestautomation.com/practice-test-login"
DASHBOARD_URL = "https://practicetestautomation.com/logged-in-successfully"
VALID_USERNAME = "testuser"
VALID_PASSWORD = "Password123"

@pytest.fixture(scope="function")
def setup_browser():
    """Setup and teardown for the browser."""
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.maximize_window()
    yield driver
    driver.quit()

def test_successful_login_with_valid_credentials(setup_browser):
    """Test case for successful login with valid credentials."""
    driver = setup_browser

    # Step 1: Open Chrome browser and navigate to the login page
    driver.get(LOGIN_PAGE_URL)
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "#username"))
    )
    assert driver.current_url == LOGIN_PAGE_URL, "Login page URL is not correct."

    # Step 2: Enter valid username
    username_field = driver.find_element(By.CSS_SELECTOR, "#username")
    username_field.send_keys(VALID_USERNAME)

    # Step 3: Enter valid password
    password_field = driver.find_element(By.CSS_SELECTOR, "#password")
    password_field.send_keys(VALID_PASSWORD)

    # Step 4: Click the login button
    login_button = driver.find_element(By.CSS_SELECTOR, "#submit")
    login_button.click()

    # Step 5: Verify the user is redirected to the dashboard
    WebDriverWait(driver, 10).until(
        EC.url_to_be(DASHBOARD_URL)
    )
    assert driver.current_url == DASHBOARD_URL, "Dashboard URL is not correct."

    # Step 6: Verify the dashboard content (e.g., check for a specific element)
    dashboard_header = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "h1"))
    )
    assert dashboard_header.text == "Logged In Successfully", "Dashboard header text is incorrect."

    print("Test passed: Successful login with valid credentials.")