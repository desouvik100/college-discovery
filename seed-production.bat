@echo off
set DATABASE_URL=postgresql://college_discovery_b298_user:9GgoH2gS8JleYU9NNcdQDXJ0nVsiuZXY@dpg-dak0ugp594qs73duhc1g-a.oregon-postgres.render.com/college_discovery_b298
echo Pushing database schema...
call npx prisma db push
echo.
echo Seeding database with college data (this will take 1-2 minutes)...
call npx prisma db seed
echo.
echo Done! Check the output above for any errors.
pause
