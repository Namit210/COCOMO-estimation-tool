# COCOMO Estimation Tool

A modern web-based calculator for software project estimation using the **Constructive Cost Model (COCOMO)**. This tool helps project managers and software engineers estimate development effort, time, and team size based on project characteristics.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [COCOMO Models](#cocomo-models)
- [API Integration](#api-integration)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Overview

The COCOMO (Constructive Cost Model) is an algorithmic software cost estimation model developed by Barry Boehm. This tool provides a user-friendly interface to calculate:

- **Development Time** (in months)
- **Effort Required** (in person-months)
- **Average Team Size** (number of people)

The calculator supports all three COCOMO models with customizable coefficients and cost drivers.

## ✨ Features

- 🎨 **Modern, Responsive UI** - Split-panel design with real-time results
- 📊 **Three COCOMO Models** - Organic, Semi-Detached, and Embedded
- ⚙️ **Customizable Coefficients** - Override default values for a, b, c, and d
- 💡 **Cost Drivers Support** - Single multiplier for Semi-Detached, multiple drivers for Embedded
- 📈 **Real-time Calculations** - Instant results via REST API integration
- 🎯 **Visual Feedback** - Color-coded modes and intuitive result cards
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend Framework:** React 19.1.1
- **Build Tool:** Vite 7.1.7
- **Styling:** CSS3 with Bootstrap 5.3.8
- **Language:** JavaScript (ES6+)
- **API Communication:** Fetch API
- **Linting:** ESLint 9.36.0

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Backend API** running on `http://localhost:5000` (see [API Integration](#api-integration))

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Namit210/COCOMO-estimation-tool.git
   cd COCOMO-estimation-tool
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

### Basic Estimation

1. **Enter KLOC** (Thousand Lines of Code)
   - Example: For 10,000 lines of code, enter `10`

2. **Select Project Mode:**
   - **Organic** 🟢 - Small teams, familiar environment (2-50 KLOC)
   - **Semi-Detached** 🟡 - Medium teams, mixed experience (50-300 KLOC)
   - **Embedded** 🔴 - Large teams, complex constraints (>300 KLOC)

3. **Click "Calculate Results"** to see:
   - Development time in months
   - Effort required in person-months
   - Average team size

### Advanced Options

**Custom Coefficients:**
You can override the default COCOMO coefficients:
- **a** - Effort equation constant
- **b** - Effort equation exponent
- **c** - Time equation constant
- **d** - Time equation exponent

**Cost Drivers:**
- **Semi-Detached Mode:** Single effort multiplier (e.g., 1.2)
- **Embedded Mode:** Multiple key-value cost driver pairs

### Example Calculation

**Input:**
- KLOC: 10
- Mode: Organic
- Default coefficients

**Output:**
- Development Time: ~6 months
- Effort: ~30 person-months
- Team Size: ~5 people

## COCOMO Models

### Organic Mode
- **Project Type:** Small to medium, well-understood applications
- **Team:** Small, experienced team
- **Environment:** Stable, in-house development
- **Default Coefficients:** a=2.4, b=1.05, c=2.5, d=0.38

### Semi-Detached Mode
- **Project Type:** Medium-sized projects with mixed complexity
- **Team:** Mixed experience levels
- **Environment:** Combination of familiar and unfamiliar elements
- **Supports:** Single cost driver (effort multiplier)

### Embedded Mode
- **Project Type:** Large, complex systems with tight constraints
- **Team:** Large teams, varied experience
- **Environment:** Complex hardware/software interfaces
- **Supports:** Multiple cost drivers

## 🔌 API Integration

This frontend requires a backend API running at `http://localhost:5000`.

### API Endpoint

**POST** `/estimate`

### Request Format

```json
{
  "model_type": "organic",
  "kloc": 10,
  "cost_drivers": {},
  "a": 2.4,
  "b": 1.05,
  "c": 2.5,
  "d": 0.38
}
```

### Response Format

```json
{
  "effort_person_months": 30.24,
  "development_time_months": 6.09
}
```

### Error Handling

The application handles:
- API connection failures
- Invalid input validation
- Server errors with user-friendly messages

## Project Structure

```
COCOMO-estimation-tool/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, icons, etc.
│   ├── App.jsx         # Main application component
│   ├── App.css         # Application styles
│   ├── Input.jsx       # Form and results component
│   ├── Input.css       # Input component styles
│   ├── NavBar.jsx      # Navigation bar component
│   ├── NavBar.css      # Navigation bar styles
│   ├── index.css       # Global styles
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
├── package.json        # Project dependencies
├── vite.config.js      # Vite configuration
├── eslint.config.js    # ESLint configuration
├── LICENSE             # MIT License
└── README.md           # This file
```

## Available Scripts

### Development

```bash
npm run dev
```
Starts the development server with hot module replacement (HMR).

### Build

```bash
npm run build
```
Creates an optimized production build in the `dist/` directory.

### Preview

```bash
npm run preview
```
Locally preview the production build.

### Lint

```bash
npm run lint
```
Run ESLint to check code quality and style issues.

## Configuration

### Vite Configuration

The project uses Vite with the React plugin. Configuration can be modified in `vite.config.js`.

### ESLint Configuration

ESLint is configured with React-specific rules. See `eslint.config.js` for details.

### API Endpoint

To change the API endpoint, modify the fetch URL in `src/Input.jsx`:

```javascript
const response = await fetch('http://your-api-url/estimate', {
  // ...
});
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write clear commit messages
- Update documentation for new features
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Namit210/COCOMO-estimation-tool/issues) page
2. Create a new issue if your problem isn't already listed
3. Provide detailed information about your environment and the issue

---

**Note:** Ensure the backend API is running before using this application. The frontend expects the API to be available at `http://localhost:5000/estimate`.

**Made by Amit Chausali and Soumen Biswas for Software Engineering Project Assignment**