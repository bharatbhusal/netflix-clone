# Netflix Clone React App

Welcome to the Netflix Clone React App! This project is a front-end clone of the popular streaming service Netflix, built using React. It features a responsive user interface with various sections showcasing different categories of movies and a banner section highlighting a random movie from Netflix Originals.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [How to Run](#how-to-run)
- [Customization](#customization)
- [Contributing](#contributing)

## Features
- Fetches movie data from The Movie Database (TMDb) API.
- Displays Netflix Originals, Trending Now, Action, Comedy, Horror, Romance, and Documentaries categories.
- Banner section with a randomly selected movie from Netflix Originals.
- Responsive navigation bar with Netflix logo and user avatar.
- Hover effects on movie posters and buttons.

## Getting Started
Follow these steps to get started with the Netflix Clone React App:

### Prerequisites
- Node.js and npm installed on your machine.

### Installation
1. Clone the repository to your local machine.
   ```bash
   git clone https://github.com/bharatbhusal/netflix-clone.git
   ```

2. Navigate to the project directory.
   ```bash
   cd netflix-clone
   ```

3. Install the project dependencies.
   ```bash
   npm install
   ```

## Project Structure
The project structure is organized as follows:
- **`src/`**: Contains the source code of the React app.
  - **`App.js`**: The main React component that renders the Netflix Clone app.
  - **`index.js`**: Entry point for rendering the React app.
  - **`App.css`**: Stylesheet for styling the components.
  - **`images/`**: Directory containing image assets used in the project.
  - **`utils/`**: Utility functions, including `validateEnv` for handling environment variables.

## How to Run
1. After installing the dependencies, start the development server.
   ```bash
   npm start
   ```

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

3. Explore the Netflix Clone React App and enjoy the movie categories and banner section!

## Customization
Feel free to customize the project to suit your preferences. You can update the API key, base URL, and other environment variables in the `validateEnv` utility. Additionally, you can modify the styles in the `App.css` file to change the look and feel of the app.

## Contributing
Contributions are welcome! If you find any issues or have improvements to suggest, please open an issue or submit a pull request.