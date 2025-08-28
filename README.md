# Docker Compose - Vue.js - PHP Environment

# 1. Overview

## 1.1 Directory Structure
```
.
├── docker-compose.yml
├── .docker/
│   ├── Dockerfile.php
│   └── Dockerfile.frontend
├── src/
│   ├── public/
│   │   ├── index.php
│   │   └── ... your Vue.js build output
│   └── backend/
│       └── ... your PHP files
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.js
        └── style.scss
```

# Appendix A: Configuration Files

## A.1 Docker-Compose
