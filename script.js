let isPlaying = false; 
    // Function to generate fortune
    function generateFortune() {
        const fortuneDiv = document.getElementById("fortune");
        const sound = document.getElementById("fortuneSound");
    
        // Check if sound is already playing and stop it
        if (isPlaying) {
            fortuneDiv.classList.add("fade-out");
            setTimeout(() => {
                sound.pause();
                sound.currentTime = 0;
                fortuneDiv.classList.remove("fade-out");
                isPlaying = false;
            }, 2000);
        } else {
            // Fetch fortune from an external API
            fetch('https://api.adviceslip.com/advice')  // Using "advice" API as a placeholder for fortune
                .then(response => response.json())
                .then(data => {
                    // Show the fortune in the div
                    fortuneDiv.textContent = `"${data.slip.advice}"`;
                    fortuneDiv.style.opacity = 1;
                    
                    // Apply shake animation
                    fortuneDiv.style.animation = "shake 0.5s";
                    setTimeout(() => { fortuneDiv.style.animation = ""; }, 500);
    
                    // Play the sound
                    sound.play();
    
                    // Stop the sound after 15 seconds
                    setTimeout(() => {
                        sound.pause();
                        sound.currentTime = 0;
                        isPlaying = false;
                    }, 15000);
    
                    isPlaying = true;
                })
                .catch(error => {
                    // Handle any error that occurs during the fetch
                    fortuneDiv.textContent = "Oops! Something went wrong. Please try again later.";
                    console.error("Error fetching fortune:", error);
                });
        }
    }
    