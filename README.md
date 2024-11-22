# MindSpace: Full-Stack Workspace Application

## Overview

MindSpace is a full-stack collaborative workspace application designed to enhance productivity and streamline workflows for users. It integrates various functionalities such as task management, document publishing, file management, and user authentication, making it a comprehensive solution for modern work environments. This README provides an overview of the project, its features, installation instructions, usage guidelines, and contribution details.

## Features

- **Collaborative Workspace**: Offers real-time collaboration tools for users to work together efficiently.
- **Notion-style Editor**: A user-friendly editor that allows for easy document creation and management.
- **Responsive Design**: Supports light and dark modes and is fully responsive for mobile devices.
- **User Authentication**: Secure login and user management features.
- **Task Management**: Tools for tracking tasks and deadlines to improve productivity.
- **File Management**: Easy upload, storage, and sharing of files within the workspace.

## Technical Architecture

MindSpace utilizes a robust full-stack framework comprising:

- **Frontend**: Built with Next.js, ensuring a dynamic and responsive user interface.
- **Backend**: Developed using Node.js, providing a powerful server-side environment.
- **Database**: Convex is employed for efficient data storage and retrieval.
- **APIs**: RESTful APIs facilitate seamless data communication between the frontend and backend.
- **OAuth**: Clerk Authentication for seamless security.

## Installation

To set up MindSpace locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/mindspace.git
   cd mindspace
   ```

2. **Install Dependencies**:
   For the frontend:
   ```bash
   cd client
   npm install
   ```

   For the backend:
   ```bash
   cd server
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory of the server with the following variables:
   Deployment used by `npx convex dev`

     ```
      CONVEX_DEPLOYMENT=
      
      NEXT_PUBLIC_CONVEX_URL=
      
      
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
      CLERK_SECRET_KEY=
      
      EDGE_STORE_ACCESS_KEY=
      EDGE_STORE_SECRET_KEY=
    ```

4. **Run the Application**:
   Start the backend server:
   ```bash
   cd server
   npx convex dev
   ```

   Start the frontend application:
   ```bash
   cd client
   npm run dev
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000` to view MindSpace.

## Usage

Once installed, users can create an account or log in to access their personalized workspace. The intuitive interface allows users to:

- Create and manage documents using the Notion-style editor.
- Collaborate with team members in real-time.
- Track tasks and deadlines effectively.
- Manage files within their workspace seamlessly.

## Contributing

Contributions are welcome! To contribute to MindSpace:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to your branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Thanks to all contributors who have helped shape MindSpace into a powerful tool for enhancing productivity in collaborative environments.

---

Feel free to customize this README further based on specific project requirements or additional features implemented in MindSpace.

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/35361176/30f3a414-a12c-4bd6-9328-0a8e206a2d85/SEIR-Research-Paper-Reviewed.pdf
