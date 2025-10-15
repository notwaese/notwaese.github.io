document.addEventListener('DOMContentLoaded', () => {
            const toggleButton = document.getElementById('toggle');
            const emojiHeader = document.getElementById('emojiHeader');
            const contentArea = document.getElementById('contentArea');
            const cardBody = document.querySelector('.body');
            const pageBody = document.body;

            // --- State Management Constants ---
            const STATE_ANNIVERSARY = 'ANNIVERSARY';
            const STATE_MEMORIES_1 = 'MEMORIES_1';
            const STATE_MEMORIES_2 = 'MEMORIES_2';
            let appState = STATE_ANNIVERSARY; 

            // --- Mock Memory Data ---
           const memoriesSet1 = [
                { id: 'm1', title: 'my turn to be an egg', iframe: 'https://drive.google.com/file/d/1IKOswd_SOQ0MmWLfdT_mPduQn_rcShtP/preview', description: "i was an egg. and u were a cute baby" },
                { id: 'm2', title: 'as ur driver', iframe: 'https://drive.google.com/file/d/1L9oMHYxla4OZT-ayd2RQdGat381GweGb/preview', description: "a cute baby taking selfies when i wasn't looking!" },
                { id: 'm3', title: 'ragdoll on gbed', iframe: 'https://drive.google.com/file/d/10yWq9aDTJdKMuIJ7q5h8gtHG79ulMlox/preview', description: "idk HAHAHHAAHHA" },
                { id: 'm4', title: 'rainy dayyy(te)', iframe: 'https://drive.google.com/file/d/1pJDYTkTX0QAgpCj39CQ7LO3ckP9JomLU/preview', description: "cheeeek merge!" },
            ];

            const memoriesSet2 = [
                // Using placeholder URLs since the user only provided placeholder image links for Set 2.
                { id: 'm5', title: 'hehe', iframe: 'https://drive.google.com/file/d/1hySLyih0SFDl_mvDg1pOhnniXjBWz0Ns/preview', description: "incognito. mission complete." },
                { id: 'm6', title: 'all i hab purple', iframe: 'https://drive.google.com/file/d/1TOs3lYQsQivMz-irRTnVOTsOjLAWGq2L/preview', description: "performativism pro max x silk sonic" },
                { id: 'm7', title: 'acc x it', iframe: 'https://drive.google.com/file/d/1omv1lr9xCuK6E3pArudJw1BSXOORS499/preview', description: "purple and yellow. sapin sapin. yum. also my lovely girlfriend in yellow whom i want to cuddle 24/7" },
                { id: 'm8', title: 'my princess!', iframe: 'https://drive.google.com/file/d/1QQcEuEnQHM_4DqxyJ-8dR0njumopQyBk/preview', description: "EEEE the cute baby who loved getting called princess and got super giddy yeah thats right thats u!!!" },
            ];

            // --- Rendering Functions ---

            const createMemoryCardHTML = (memories) => {
                return memories.map(m => `
                    <div class="memory-card">
                        ${m.iframe ? 
                            // Render iframe if the property exists
                            `<iframe 
                                src="${m.iframe}" 
                                title="${m.title}" 
                                class="memory-iframe" 
                                frameborder="0" 
                                allow="autoplay; fullscreen; picture-in-picture" 
                                allowfullscreen
                            ></iframe>`
                            : 
                            // Fallback to image if no iframe is provided (though all are iframes now)
                            `<img 
                                src="${m.img || 'https://placehold.co/180x100/aaaaaa/ffffff?text=No+Media'}" 
                                alt="${m.title}" 
                                class="memory-iframe"
                            >`
                        }
                        <div class="p-2">
                            <strong class="text-sm block">${m.title || 'Untitled Memory'}</strong><br>
                            <button class="description-toggle text-xs" data-memory-id="${m.id}" data-action="toggle-desc">
                                Show Details
                            </button>
                        </div>
                        <p id="desc-${m.id}" class="description-text">${m.description}</p>
                    </div>
                `).join('');
            };

            const renderAnniversaryMode = () => {
                pageBody.style.backgroundColor = '#f1fdffff'; 
                cardBody.style.backgroundColor = '#ffffff'; 
                cardBody.style.boxShadow = '0 11px 50px rgba(41, 41, 41, 0.22)'; 
                
                emojiHeader.textContent = '~(>_<。)＼';
                toggleButton.textContent = 'hallooooo!';
                contentArea.innerHTML = `
                    <p class="text-xl font-bold mb-4 text-pink-500">
                        click the button pleaaaaaseeeee, the one that says hello 
                    </p>
                    <p class="text-gray-600">
                        sorry gemini helped btw i cannot js that well
                    </p>
                    <div class = "smallMessage">hi loveyy hehe happy 2 years of cr run aw yeah my life's success will be that cr run i cant lie 😅 this is smth rlly small and simple bc u said let's keep it simple munaa! so i got help from chatgpt with the js functionality but the design and other stuff are from me (￣︶￣) and i didn't include a lot of stuff bc i'd rather say them for a different thing! 
                    
                    <br> <br>but just so you know, this was a panglingaw lingaw lang na thing hehe js to cheer u up in a way tew on our anniv likee just some cute pictures of both of us tgt from the past few months and goofy descriptions of them >< <br><br>
                    
                    AND against all odds, we made it to 2 years and that's not an easy feat! i ended shs with you, and now i'm halfway the halfway point of college with you, uncertainties and all (*>﹏<*)′. whether it's gonna be a future with a bounce house, 15 cats or a tiger and ducks, in an apartment, in a condo, in manila, in davao, in singapore... or maybe in space... whether it's gonna get easier or harder from now, i still wish for just one constant and that is u!

                    <br><br> happy anniversary u big baby ¯\\_(ツ)_/¯ i love you always

                    </div>
                `;
            };

            const renderMemories = (memories, modeTitle, nextState) => {
                // Theme
                pageBody.style.backgroundColor = '#dbeafe'; // Light Blue/Memory theme
                cardBody.style.backgroundColor = '#ffffff';
                cardBody.style.boxShadow = '0 10px 20px rgba(96, 165, 250, 0.5)'; // Blue Shadow

                // Content
                emojiHeader.textContent = nextState === STATE_MEMORIES_2 ? '(⊙_⊙)？' : '^_~';
                toggleButton.textContent = nextState === STATE_MEMORIES_2 ? 'onto the next!' : 'back to start';
                toggleButton.setAttribute('data-next-state', nextState); 

                const memoryCardsHTML = createMemoryCardHTML(memories);

                contentArea.innerHTML = `
                    <h2 class="text-xl font-bold mb-4 text-blue-600">${modeTitle}</h2>
                    <div class="memory-grid mb-4">
                        ${memoryCardsHTML}
                    </div>
                    <button id="backToAnniversary" 
                            class="py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors"
                            data-action="goto-anniversary">
                        return to start
                    </button>
                `;
            };
            
            const renderMemories1 = () => {
                renderMemories(memoriesSet1, "we r derpy hehehe", STATE_MEMORIES_2);
            };

            const renderMemories2 = () => {
                renderMemories(memoriesSet2, "☆*: .｡. o(≧▽≦)o .｡.:*☆", STATE_ANNIVERSARY);
            };

            const updateCard = () => {
                switch (appState) {
                    case STATE_ANNIVERSARY:
                        renderAnniversaryMode();
                        break;
                    case STATE_MEMORIES_1:
                        renderMemories1();
                        break;
                    case STATE_MEMORIES_2:
                        renderMemories2();
                        break;
                }
            };

            toggleButton.addEventListener('click', () => {
                switch (appState) {
                    case STATE_ANNIVERSARY:
                        appState = STATE_MEMORIES_1;
                        break;
                    case STATE_MEMORIES_1:
                        appState = STATE_MEMORIES_2;
                        break;
                    case STATE_MEMORIES_2:
                        appState = STATE_ANNIVERSARY;
                        break;
                }
                updateCard();
            });

            contentArea.addEventListener('click', (e) => {
                const target = e.target;
                const action = target.getAttribute('data-action');

                if (action === 'toggle-desc') {
                    const memoryId = target.getAttribute('data-memory-id');
                    const descriptionElement = document.getElementById(`desc-${memoryId}`);
                    
                    descriptionElement.classList.toggle('active');

                    if (descriptionElement.classList.contains('active')) {
                        target.textContent = 'Hide Details';
                    } else {
                        target.textContent = 'Show Details';
                    }
                } else if (action === 'goto-anniversary') {
                    appState = STATE_ANNIVERSARY;
                    updateCard();
                }
            });

            // Initialize state
            updateCard();

        });
