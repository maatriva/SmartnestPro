# SmartNestPro Backend

This is the Express backend for SmartNestPro, using PostgreSQL for data storage.

## Setup

1.  **Configure Environment Variables**:
    Update the `.env` file with your PostgreSQL connection details.
    
    ```env
    PORT=5000
    DATABASE_URL=postgres://postgres:password@localhost:5432/smartnestpro
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
-   `POST /api/surveys`: Submit survey data
-   `GET /api/surveys`: Retrieve all survey results
