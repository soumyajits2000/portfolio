#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: |
  Build an elegant, formal, minimalist research portfolio for Soumyajit Samal (incoming PhD candidate
  at LMU Munich, working on 2D nanoelectronics). Content extracted from soumyajitsamal.in. Frontend
  built with paper/journal aesthetic (Crimson Pro + Inter, cream background, burgundy accent).
  Backend now needed to (a) accept contact-form submissions, and (b) serve dynamic news items.

backend:
  - task: "Health endpoint GET /api/health"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Simple liveness probe returning {status: ok}."
      - working: true
        agent: "testing"
        comment: "✅ PASSED: Health endpoint returns {status: ok} with HTTP 200. Root endpoint returns JSON with 'Soumyajit'. All validation working correctly."

  - task: "Contact form: POST /api/contact + GET /api/contact"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: |
          POST validates (EmailStr, name 1-120 chars, message 1-4000 chars), persists to MongoDB
          collection `contact_messages` with uuid id and ISO received_at, returns {id, received_at, ok}.
          GET returns latest 50, newest first. Test invalid email -> 422, valid payload -> 200.
      - working: true
        agent: "testing"
        comment: |
          ✅ PASSED: All contact endpoints working perfectly. Valid submission returns 200 with proper UUID and timestamp. 
          Invalid email/empty name/missing message all return 422 as expected. GET endpoint retrieves messages correctly 
          with newest first ordering. Limit parameter respected. Data persistence verified.

  - task: "News: GET /api/news, POST /api/news, DELETE /api/news/{id}"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: |
          GET returns documents from `news` collection sorted by created_at desc; if collection is
          empty, returns 4 seeded fallback items (id prefixed `seed-`). POST creates and returns the
          item (201). DELETE removes by id, returns 404 if not found.
      - working: true
        agent: "testing"
        comment: |
          ✅ PASSED: All news endpoints working perfectly. GET returns seeded fallback items when empty (4 items with seed- prefix). 
          POST creates news with 201 status and real UUID. New items appear first in subsequent GET requests. 
          DELETE removes items correctly and returns 200. DELETE with non-existent ID returns 404 as expected. 
          CORS headers present with Access-Control-Allow-Origin: *.

frontend:
  - task: "Contact form wired to backend"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/sections/Contact.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Replaced localStorage stub with axios POST to /api/contact + toast feedback."

  - task: "Hero news fetched from backend with mock fallback"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/sections/Hero.jsx"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "useEffect calls /api/news; falls back silently to mock news on error/empty."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: false

test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: |
      Backend MVP is in. Three endpoint groups to verify: /api/health, /api/contact (POST+GET),
      /api/news (GET+POST+DELETE). Use the public REACT_APP_BACKEND_URL from frontend/.env as base.
      Validation matters: invalid email on /api/contact must return 422; empty news collection must
      return seeded fallback (4 items with id starting "seed-"); created news item must appear first
      in subsequent GET. After tests, please clean up created data where reasonable.
  - agent: "testing"
    message: |
      ✅ BACKEND TESTING COMPLETE: All 15 test cases PASSED! 
      
      Comprehensive testing performed on all FastAPI endpoints at https://academic-archive-3.preview.emergentagent.com/api:
      
      1. Health & Root endpoints: ✅ Working perfectly
      2. Contact endpoints (POST/GET): ✅ All validation, persistence, and retrieval working
      3. News endpoints (GET/POST/DELETE): ✅ CRUD operations, seeded fallback, ordering all working
      4. CORS headers: ✅ Properly configured
      
      All backend functionality is production-ready. No issues found. Backend APIs are fully functional.
