const Gun = require('gun');
require('gun/sea');

// Initialize Gun with multiple peer nodes
const gun = Gun({
    peers: [
        'https://gun-manhattan.herokuapp.com/gun',
        'https://gun-leaflet.herokuapp.com/gun',
        'http://peer-to-gun/gun'
    ]
});

// Example: Storing data in a decentralized manner
const fileData = { filename: 'report.pdf', content: 'Base64EncodedContent', timestamp: Date.now() };
gun.get('fileSandyk').set(fileData);

// Real-time synchronization demonstration
gun.get('fileSandyk').on((data) => {
    console.log('Synchronized Data:', data);
});
