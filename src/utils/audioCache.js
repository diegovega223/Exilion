import defaultBeepUrl from '../../src/assets/audio/se/default-beep.ogg';
import defaultAdvanceUrl from '../../src/assets/audio/se/default-advance.ogg';

export const defaultBeep = new Audio(defaultBeepUrl);
defaultBeep.volume = 1;

export const defaultAdvance = new Audio(defaultAdvanceUrl);
defaultAdvance.volume = 1;

export const cloneAudio = (audio) => {
    const newAudio = new Audio(audio.src);
    newAudio.volume = isFinite(audio.volume) ? audio.volume : 1;
    return newAudio;
};
