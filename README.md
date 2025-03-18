# Laravel + React Project Setup

## Prerequisites
Ensure you have the following installed:
- PHP (>= 8.0)
- Composer
- Node.js (>= 16.0)
- npm or yarn
- MySQL (or your preferred database)

## Installation Steps

### 1. Clone the Repository
```sh
git clone <repository-url>
cd <project-folder>
```

### 2. Set Up Backend (Laravel)
```sh
composer install
cp .env.example .env
php artisan key:generate
```

### 3. Configure Database
Update `.env` with your database credentials:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```
Then run migrations:
```sh
php artisan migrate --seed
```

### 4. Set Up Frontend (React)
```sh
npm install
```

### 5. Run the Project
#### Run Laravel Backend
```sh
php artisan serve
```
#### Run React Frontend
```sh
npm run dev
```

## Additional Commands
- **Build Frontend** (for production)
  ```sh
  npm run build
  ```
- **Run Vite for Hot Reloading**
  ```sh
  npm run dev
  ```
- **Clear Cache**
  ```sh
  php artisan cache:clear
  php artisan config:clear
  php artisan route:clear
  php artisan view:clear
  ```

## Troubleshooting
- If `npm run dev` fails, try deleting `node_modules` and reinstalling dependencies:
  ```sh
  rm -rf node_modules package-lock.json
  npm install
  ```
- If migrations fail, check your database credentials in `.env`.

## Deployment Notes
- Use `php artisan config:cache` and `php artisan route:cache` for performance in production.
- Deploy frontend assets using `npm run build` and ensure `VITE_APP_URL` is correctly set.

---

This should help you get started! Let me know if you need further refinements.

