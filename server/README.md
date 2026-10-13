# Maatriva Backend

This is the Express backend for Maatriva, using PostgreSQL for data storage.

## Setup

1.  **Configure Environment Variables**:
    Update the `.env` file with your PostgreSQL connection details.
    
    ```env
    PORT=5000
    DATABASE_URL=postgres://postgres:password@localhost:5432/maatriva
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Database Migration**:
    You can run the contents of `schema.sql` in your PostgreSQL database, OR just start the server and navigate to:
    `http://localhost:5000/api/setup` (This will create the tables automatically).

4.  **Start the Server**:
    ```bash
    npm run dev
    ```

## API Endpoints

-   `GET /`: Home (Health check)
-   `GET /api/setup`: One-time setup to create the database table
-   `POST /api/contacts`: Submit contact form (triggers Resend emails)
-   `POST /api/preorders`: Submit pre-order / inquiry (triggers Resend emails)
-   `POST /api/auth/signup`: User registration (triggers Resend welcome email)
-   `POST /api/surveys`: Submit survey data
-   `GET /api/surveys`: Retrieve all survey results

## Resend Email Configuration

Transactional emails are powered by [Resend](https://resend.com).

1. Add your credentials to [server/.env](file:///d:/ORGO%20bhaiya/smart%20nest%20pro/server/.env):
   ```env
   RESEND_API_KEY=re_your_api_key_here
   EMAIL_FROM=Maatriva <onboarding@resend.dev> # Or your verified domain: hello@yourdomain.com
   ADMIN_EMAIL=admin@maatriva.co.in
   ```

2. Test your Resend configuration anytime:
   ```bash
   npm run test:email -- your-email@example.com
   ```

