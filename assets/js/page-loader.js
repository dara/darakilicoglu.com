document.addEventListener('DOMContentLoaded', function() {
    const fadeElement = document.querySelector('.fade-in');
    
    // Function to check if an image is cached
    function isImageCached(img) {
        return img.complete && img.naturalHeight !== 0;
    }

    // Create a promise that resolves when all images are loaded
    const imagePromises = Array.from(document.images).map(img => {
        return new Promise((resolve) => {
            if (isImageCached(img)) {
                resolve();
            } else {
                img.onload = () => resolve();
                img.onerror = () => resolve();
            }
        });
    });

    // Wait for all images to load
    Promise.all(imagePromises)
        .then(() => {
            // Small delay to ensure everything is ready
            setTimeout(() => {
                fadeElement.classList.add('visible');
            }, 100);
        })
        .catch(() => {
            // If there's any error, show the content anyway
            fadeElement.classList.add('visible');
        });
}); 