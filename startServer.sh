localIpAddress=$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1')

updatePath="./app/_layout.tsx"

function cleanup {
    echo "Cleaning up..."
    sed -i '' "s/const IP = '.*';/const IP = 'localhost';/" "$updatePath"
    echo "Local IP address set to localhost in $updatePath"
    sudo /Applications/XAMPP/xamppfiles/xampp stopapache
    sudo /Applications/XAMPP/xamppfiles/xampp stopmysql
    sudo lsof -i :3306 | awk '/mysqld/{print $2}' | xargs sudo kill
    echo "XAMPP server shut down"
    sleep 2
    echo "XAMPP server status:"
    sudo /Applications/XAMPP/xamppfiles/xampp status
}

trap cleanup EXIT

echo "Setting local IP address"

sed -i '' "s/const IP = '.*';/const IP = '${localIpAddress}';/" "$updatePath"

echo "Local IP address SET to ${localIpAddress} in ${updatePath}"

echo "Starting PHP & SQL Server..."

sudo /Applications/XAMPP/xamppfiles/xampp startapache
sudo /Applications/XAMPP/xamppfiles/xampp startmysql
sleep 2
echo "XAMPP server status:"
sudo /Applications/XAMPP/xamppfiles/xampp status

echo "XAMPP Server Started"

echo "Starting Expo App..."

npx expo start
