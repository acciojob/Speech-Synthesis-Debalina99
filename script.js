// Your script here.

  function populateVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      voicesDropdown.innerHTML = '<option disabled>No voices available</option>';
      return;
    }
    voicesDropdown.innerHTML = voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    restartSpeech();
  }
  function setOption() {
    msg[this.name] = this.value;
    if (speechSynthesis.speaking) restartSpeech();
  }

  function speak() {
    if (!msg.text.trim()) return alert("Please enter text to speak!");
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
  }
  function stop() {
    speechSynthesis.cancel();
  }
  function restartSpeech() {
    stop();
    speak();
  }
  msg.text = document.querySelector('[name="text"]').value;

  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('change', setOption));
  speakButton.addEventListener('click', speak);
  stopButton.addEventListener('click', stop);

