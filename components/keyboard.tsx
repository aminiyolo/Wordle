import Keypad from './keypad';

const TOP_KEYS = ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'];
const MIDDLE_KEYS = ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'];
const BOTTOM_KEYS = ['Enter', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', '<--'];

export type KeyboardProps = {
  handleKeypadClick: (word: string) => void;
};

export default function Keyboard({ handleKeypadClick }: KeyboardProps) {
  return (
    <div className='flex flex-col items-center mt-[4.5rem] sm:mt-[4rem]'>
      <div className='flex flex-row'>
        {TOP_KEYS.map((keyword, idx) => (
          <Keypad
            key={idx}
            keyword={keyword}
            handleKeypadClick={handleKeypadClick}
          />
        ))}
      </div>
      <div className='flex flex-row'>
        {MIDDLE_KEYS.map((keyword, idx) => (
          <Keypad
            key={idx}
            keyword={keyword}
            handleKeypadClick={handleKeypadClick}
          />
        ))}
      </div>
      <div className='flex flex-row'>
        {BOTTOM_KEYS.map((keyword, idx) => (
          <Keypad
            key={idx}
            keyword={keyword}
            handleKeypadClick={handleKeypadClick}
          />
        ))}
      </div>
    </div>
  );
}
