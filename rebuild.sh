if [ "$1" == "nocontainer" ]; then
  echo "Starting new container.."
else
  echo "Restarting container.."
  docker stop weekly-database && docker rm -f weekly-database
fi
docker pull danielkang674/weekly-database:latest && docker run --name weekly-database -p 3001:3001 --network br0 --env-file .env -d danielkang674/weekly-database:latest
