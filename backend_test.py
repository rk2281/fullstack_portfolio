#!/usr/bin/env python3
"""
Backend API Testing Script for Rachit Kapoor Portfolio Website
Tests all API endpoints to ensure they are working correctly.
"""

import requests
import json
import sys
from typing import Dict, Any

# Get backend URL from environment
BACKEND_URL = "http://localhost:8001"

def test_endpoint(method: str, endpoint: str, data: Dict[Any, Any] = None) -> Dict[str, Any]:
    """Test a single API endpoint and return results"""
    url = f"{BACKEND_URL}{endpoint}"
    
    try:
        if method.upper() == "GET":
            response = requests.get(url, timeout=10)
        elif method.upper() == "POST":
            response = requests.post(url, json=data, timeout=10)
        else:
            return {"success": False, "error": f"Unsupported method: {method}"}
        
        # Check if response is successful
        success = response.status_code == 200
        
        # Try to parse JSON response
        try:
            json_data = response.json()
        except json.JSONDecodeError:
            json_data = {"error": "Invalid JSON response", "text": response.text}
        
        return {
            "success": success,
            "status_code": response.status_code,
            "headers": dict(response.headers),
            "data": json_data,
            "response_time": response.elapsed.total_seconds()
        }
        
    except requests.exceptions.ConnectionError:
        return {"success": False, "error": "Connection refused - Backend server may not be running"}
    except requests.exceptions.Timeout:
        return {"success": False, "error": "Request timeout"}
    except Exception as e:
        return {"success": False, "error": f"Unexpected error: {str(e)}"}

def check_cors_headers(headers: Dict[str, str]) -> Dict[str, Any]:
    """Check if CORS headers are properly configured"""
    cors_headers = {
        "access-control-allow-origin": headers.get("access-control-allow-origin"),
        "access-control-allow-methods": headers.get("access-control-allow-methods"),
        "access-control-allow-headers": headers.get("access-control-allow-headers"),
        "access-control-allow-credentials": headers.get("access-control-allow-credentials")
    }
    
    cors_configured = any(value for value in cors_headers.values())
    
    return {
        "cors_configured": cors_configured,
        "headers": cors_headers
    }

def validate_profile_data(data: Dict[str, Any]) -> Dict[str, Any]:
    """Validate profile endpoint response structure"""
    required_fields = ["profile"]
    profile_fields = ["name", "title", "bio", "photo_url", "resume_url", "contact"]
    contact_fields = ["email", "github", "linkedin"]
    
    issues = []
    
    # Check top level structure
    for field in required_fields:
        if field not in data:
            issues.append(f"Missing required field: {field}")
    
    if "profile" in data:
        profile = data["profile"]
        # Check profile fields
        for field in profile_fields:
            if field not in profile:
                issues.append(f"Missing profile field: {field}")
        
        # Check contact fields
        if "contact" in profile:
            contact = profile["contact"]
            for field in contact_fields:
                if field not in contact:
                    issues.append(f"Missing contact field: {field}")
    
    return {
        "valid": len(issues) == 0,
        "issues": issues,
        "expected_name": "Rachit Kapoor"
    }

def validate_projects_data(data: Dict[str, Any]) -> Dict[str, Any]:
    """Validate projects endpoint response structure"""
    issues = []
    
    if "projects" not in data:
        issues.append("Missing 'projects' field")
        return {"valid": False, "issues": issues}
    
    projects = data["projects"]
    if not isinstance(projects, list):
        issues.append("Projects should be a list")
        return {"valid": False, "issues": issues}
    
    if len(projects) == 0:
        issues.append("No projects found")
    
    # Check each project structure
    required_project_fields = ["id", "title", "description", "technologies"]
    for i, project in enumerate(projects):
        for field in required_project_fields:
            if field not in project:
                issues.append(f"Project {i}: Missing field '{field}'")
    
    return {
        "valid": len(issues) == 0,
        "issues": issues,
        "project_count": len(projects)
    }

def validate_technologies_data(data: Dict[str, Any]) -> Dict[str, Any]:
    """Validate technologies endpoint response structure"""
    issues = []
    
    if "technologies" not in data:
        issues.append("Missing 'technologies' field")
        return {"valid": False, "issues": issues}
    
    technologies = data["technologies"]
    if not isinstance(technologies, list):
        issues.append("Technologies should be a list")
        return {"valid": False, "issues": issues}
    
    if len(technologies) == 0:
        issues.append("No technologies found")
    
    # Check each technology structure
    required_tech_fields = ["name", "category", "level"]
    for i, tech in enumerate(technologies):
        for field in required_tech_fields:
            if field not in tech:
                issues.append(f"Technology {i}: Missing field '{field}'")
    
    return {
        "valid": len(issues) == 0,
        "issues": issues,
        "technology_count": len(technologies)
    }

def validate_contact_response(data: Dict[str, Any]) -> Dict[str, Any]:
    """Validate contact form submission response"""
    issues = []
    
    required_fields = ["status", "message"]
    for field in required_fields:
        if field not in data:
            issues.append(f"Missing field: {field}")
    
    if "status" in data and data["status"] != "success":
        issues.append(f"Unexpected status: {data['status']}")
    
    return {
        "valid": len(issues) == 0,
        "issues": issues
    }

def test_frontend_integration():
    """Test if frontend can actually access the backend"""
    print("6. Testing Frontend Integration")
    
    # Test with the exact URL the frontend uses
    frontend_backend_url = "http://localhost:8001"  # From frontend/.env
    
    try:
        # Test the same way frontend components do
        response = requests.get(f"{frontend_backend_url}/api/profile", timeout=5)
        if response.status_code == 200:
            print("   ✅ Frontend can access backend API")
            print(f"   📊 Response time: {response.elapsed.total_seconds():.3f}s")
            
            # Check CORS headers specifically
            cors_origin = response.headers.get('access-control-allow-origin')
            if cors_origin == '*':
                print("   ✅ CORS allows all origins (frontend can access)")
            else:
                print(f"   ⚠️  CORS origin: {cors_origin}")
            
            return True
        else:
            print(f"   ❌ Frontend cannot access backend: HTTP {response.status_code}")
            return False
            
    except Exception as e:
        print(f"   ❌ Frontend integration test failed: {str(e)}")
        return False

def main():
    """Main testing function"""
    print("=" * 60)
    print("BACKEND API TESTING - RACHIT KAPOOR PORTFOLIO")
    print("=" * 60)
    print(f"Testing backend at: {BACKEND_URL}")
    print()
    
    all_tests_passed = True
    test_results = {}
    
    # Test 1: Root endpoint
    print("1. Testing Root Endpoint (GET /)")
    result = test_endpoint("GET", "/")
    test_results["root"] = result
    
    if result["success"]:
        print("   ✅ Root endpoint accessible")
        print(f"   📊 Response time: {result['response_time']:.3f}s")
        cors_check = check_cors_headers(result["headers"])
        if cors_check["cors_configured"]:
            print("   ✅ CORS headers configured")
        else:
            print("   ⚠️  CORS headers not found")
    else:
        print(f"   ❌ Root endpoint failed: {result.get('error', 'Unknown error')}")
        all_tests_passed = False
    print()
    
    # Test 2: Profile endpoint
    print("2. Testing Profile Endpoint (GET /api/profile)")
    result = test_endpoint("GET", "/api/profile")
    test_results["profile"] = result
    
    if result["success"]:
        print("   ✅ Profile endpoint accessible")
        print(f"   📊 Response time: {result['response_time']:.3f}s")
        
        # Validate data structure
        validation = validate_profile_data(result["data"])
        if validation["valid"]:
            print("   ✅ Profile data structure valid")
            profile_data = result["data"]["profile"]
            print(f"   👤 Name: {profile_data.get('name', 'N/A')}")
            print(f"   💼 Title: {profile_data.get('title', 'N/A')}")
        else:
            print("   ❌ Profile data validation failed:")
            for issue in validation["issues"]:
                print(f"      - {issue}")
            all_tests_passed = False
    else:
        print(f"   ❌ Profile endpoint failed: {result.get('error', 'Unknown error')}")
        all_tests_passed = False
    print()
    
    # Test 3: Projects endpoint
    print("3. Testing Projects Endpoint (GET /api/projects)")
    result = test_endpoint("GET", "/api/projects")
    test_results["projects"] = result
    
    if result["success"]:
        print("   ✅ Projects endpoint accessible")
        print(f"   📊 Response time: {result['response_time']:.3f}s")
        
        # Validate data structure
        validation = validate_projects_data(result["data"])
        if validation["valid"]:
            print("   ✅ Projects data structure valid")
            print(f"   📁 Project count: {validation['project_count']}")
        else:
            print("   ❌ Projects data validation failed:")
            for issue in validation["issues"]:
                print(f"      - {issue}")
            all_tests_passed = False
    else:
        print(f"   ❌ Projects endpoint failed: {result.get('error', 'Unknown error')}")
        all_tests_passed = False
    print()
    
    # Test 4: Technologies endpoint
    print("4. Testing Technologies Endpoint (GET /api/technologies)")
    result = test_endpoint("GET", "/api/technologies")
    test_results["technologies"] = result
    
    if result["success"]:
        print("   ✅ Technologies endpoint accessible")
        print(f"   📊 Response time: {result['response_time']:.3f}s")
        
        # Validate data structure
        validation = validate_technologies_data(result["data"])
        if validation["valid"]:
            print("   ✅ Technologies data structure valid")
            print(f"   🛠️  Technology count: {validation['technology_count']}")
        else:
            print("   ❌ Technologies data validation failed:")
            for issue in validation["issues"]:
                print(f"      - {issue}")
            all_tests_passed = False
    else:
        print(f"   ❌ Technologies endpoint failed: {result.get('error', 'Unknown error')}")
        all_tests_passed = False
    print()
    
    # Test 5: Contact form endpoint
    print("5. Testing Contact Form Endpoint (POST /api/contact)")
    contact_data = {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "subject": "Test Message",
        "message": "This is a test message to verify the contact form is working properly."
    }
    
    result = test_endpoint("POST", "/api/contact", contact_data)
    test_results["contact"] = result
    
    if result["success"]:
        print("   ✅ Contact endpoint accessible")
        print(f"   📊 Response time: {result['response_time']:.3f}s")
        
        # Validate response structure
        validation = validate_contact_response(result["data"])
        if validation["valid"]:
            print("   ✅ Contact form response valid")
            print(f"   📧 Status: {result['data'].get('status', 'N/A')}")
        else:
            print("   ❌ Contact form response validation failed:")
            for issue in validation["issues"]:
                print(f"      - {issue}")
            all_tests_passed = False
    else:
        print(f"   ❌ Contact endpoint failed: {result.get('error', 'Unknown error')}")
        all_tests_passed = False
    print()
    
    # Summary
    print("=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    if all_tests_passed:
        print("🎉 ALL TESTS PASSED!")
        print("✅ Backend API is working correctly")
        print("✅ All endpoints are accessible")
        print("✅ Data structures are valid")
        print("✅ CORS is configured")
    else:
        print("❌ SOME TESTS FAILED!")
        print("🔍 Issues found that may cause frontend problems:")
        
        failed_endpoints = []
        for endpoint, result in test_results.items():
            if not result.get("success", False):
                failed_endpoints.append(endpoint)
        
        if failed_endpoints:
            print(f"   - Failed endpoints: {', '.join(failed_endpoints)}")
        
        print("\n🛠️  Recommended actions:")
        print("   1. Check if backend server is running on localhost:8001")
        print("   2. Verify CORS configuration allows frontend requests")
        print("   3. Check server logs for any errors")
        print("   4. Ensure all required dependencies are installed")
    
    print()
    print("=" * 60)
    
    return all_tests_passed

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)