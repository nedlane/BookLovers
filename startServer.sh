localIpAddress=$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1')

updatePath="./app/_layout.tsx"

function cleanup {
    sed -i '' "s/const IP = '.*';/const IP = 'localhost';/" "$updatePath"
    echo "Local IP address set to localhost in $updatePath"
    sudo /Applications/XAMPP/xamppfiles/xampp stopapache
    sudo /Applications/XAMPP/xamppfiles/xampp stopmysql
    sudo lsof -i :3306 | awk '/mysqld/{print $2}' | xargs sudo kill
    echo "XAMPP server shut down"
    sleep 5
    sudo /Applications/XAMPP/xamppfiles/xampp status
}

trap cleanup EXIT

sed -i '' "s/const IP = '.*';/const IP = '${localIpAddress}';/" "$updatePath"

echo "Local IP address set to ${localIpAddress} in ${updatePath}"

echo "Starting server..."

sudo /Applications/XAMPP/xamppfiles/xampp startapache
sudo /Applications/XAMPP/xamppfiles/xampp startmysql
sleep 5
sudo /Applications/XAMPP/xamppfiles/xampp status

echo "PHP Server started"

echo "Starting React App..."

npx expo start
