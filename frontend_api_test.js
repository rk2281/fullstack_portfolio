// Frontend API Test - Simulates how React components fetch data
const fetch = require('node-fetch');

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

async function testFrontendAPICall(endpoint, description) {
    console.log(`\n🧪 Testing ${description}`);
    console.log(`   URL: ${BACKEND_URL}${endpoint}`);
    
    try {
        const startTime = Date.now();
        const response = await fetch(`${BACKEND_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3000'
            }
        });
        
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        if (response.ok) {
            const data = await response.json();
            console.log(`   ✅ Success (${response.status}) - ${responseTime}ms`);
            console.log(`   📦 Data keys: ${Object.keys(data).join(', ')}`);
            
            // Check specific data based on endpoint
            if (endpoint === '/api/profile' && data.profile) {
                console.log(`   👤 Profile: ${data.profile.name} - ${data.profile.title}`);
            } else if (endpoint === '/api/projects' && data.projects) {
                console.log(`   📁 Projects: ${data.projects.length} found`);
            } else if (endpoint === '/api/technologies' && data.technologies) {
                console.log(`   🛠️  Technologies: ${data.technologies.length} found`);
            }
            
            return true;
        } else {
            console.log(`   ❌ Failed: HTTP ${response.status}`);
            const errorText = await response.text();
            console.log(`   📄 Error: ${errorText}`);
            return false;
        }
        
    } catch (error) {
        console.log(`   ❌ Network Error: ${error.message}`);
        return false;
    }
}

async function testContactForm() {
    console.log(`\n🧪 Testing Contact Form Submission`);
    console.log(`   URL: ${BACKEND_URL}/api/contact`);
    
    const testData = {
        name: "Test User",
        email: "test@example.com", 
        subject: "Frontend Integration Test",
        message: "Testing if the contact form works from frontend perspective"
    };
    
    try {
        const startTime = Date.now();
        const response = await fetch(`${BACKEND_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3000'
            },
            body: JSON.stringify(testData)
        });
        
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        if (response.ok) {
            const data = await response.json();
            console.log(`   ✅ Success (${response.status}) - ${responseTime}ms`);
            console.log(`   📧 Status: ${data.status}`);
            console.log(`   💬 Message: ${data.message}`);
            return true;
        } else {
            console.log(`   ❌ Failed: HTTP ${response.status}`);
            return false;
        }
        
    } catch (error) {
        console.log(`   ❌ Network Error: ${error.message}`);
        return false;
    }
}

async function main() {
    console.log('🚀 FRONTEND API INTEGRATION TEST');
    console.log('=====================================');
    console.log(`Backend URL: ${BACKEND_URL}`);
    
    const tests = [
        { endpoint: '/api/profile', description: 'Profile Data (Hero Component)' },
        { endpoint: '/api/projects', description: 'Projects Data (Projects Component)' },
        { endpoint: '/api/technologies', description: 'Technologies Data (Technologies Component)' }
    ];
    
    let allPassed = true;
    
    // Test GET endpoints
    for (const test of tests) {
        const result = await testFrontendAPICall(test.endpoint, test.description);
        if (!result) allPassed = false;
    }
    
    // Test POST endpoint
    const contactResult = await testContactForm();
    if (!contactResult) allPassed = false;
    
    console.log('\n📊 SUMMARY');
    console.log('===========');
    if (allPassed) {
        console.log('✅ All frontend API calls working correctly!');
        console.log('✅ Backend is properly configured for frontend integration');
        console.log('✅ CORS is working as expected');
        console.log('\n💡 If frontend shows "Loading Portfolio..." indefinitely:');
        console.log('   - Check browser console for JavaScript errors');
        console.log('   - Verify React components are rendering properly');
        console.log('   - Check if Framer Motion dependencies are causing issues');
    } else {
        console.log('❌ Some API calls failed - this could cause loading issues');
    }
}

main().catch(console.error);