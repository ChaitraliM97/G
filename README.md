# GenBI Professional Dashboard

This is a Next.js application that allows you to upload a dataset (CSV or XLSX) and generate business insights, charts, and strategies. It's designed to be a professional, eye-catching, and impressive tool for data presentation.

## Features

-   **Dataset Upload**: Supports CSV and XLSX file formats.
-   **Interactive Dashboard**: A modern, responsive dashboard built with React, Next.js, and Tailwind CSS.
-   **Insightful Charts**: Automatically generates 7-8 charts using ECharts to visualize your data.
-   **Business Insights**: Provides 5 data-driven and business-oriented insights.
-   **Business Strategies**: Suggests 5 actionable strategies for future business improvement.
-   **Strengths and Weaknesses**: Summarizes the current business position based on the data.
-   **Dark/Light Mode**: Includes a theme toggler for user preference.

## Getting Started

### Prerequisites

You need to have Node.js and npm (or yarn/pnpm) installed on your machine.

### Installation

1.  **Clone the repository (or download the files):**
    If you have git installed:
    ```bash
    git clone <repository_url>
    cd genbi-dashboard
    ```
    If you downloaded the files, simply navigate to the `genbi-dashboard` directory in your terminal.

2.  **Install dependencies:**
    Open your terminal in the project directory and run:
    ```bash
    npm install
    ```

### Running the Development Server

Once the dependencies are installed, you can start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Deployment on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Steps to Deploy:

1.  **Push your code to a Git repository:**
    Create a new repository on GitHub, GitLab, or Bitbucket and push your code.

2.  **Import your project on Vercel:**
    -   Go to your Vercel dashboard and click "Add New... > Project".
    -   Import the Git repository you just created.
    -   Vercel will automatically detect that you are using Next.js and configure the build settings for you.

3.  **Deploy:**
    -   Click the "Deploy" button. Your project will be built and deployed.
    -   Once the deployment is complete, you will be provided with a URL to access your live application.

That's it! Your GenBI Professional Dashboard is now live.

