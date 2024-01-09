import Keypad from './keypad';

const TOP_KEYS = ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'];
const MIDDLE_KEYS = ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'];
const BOTTOM_KEYS = ['Enter', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', '<--'];

export type KeyboardProps = {
  handleKeypadClick: (word: string) => void;
};

export default function Keyboard({ handleKeypadClick }: KeyboardProps) {
  const commonCSS = 'flex flex-row'; // Keypad 공통 CSS 변수
  return (
    <div className='flex flex-col items-center mt-[4.5rem] sm:mt-[4rem]'>
      <div className={`${commonCSS}`}>
        {TOP_KEYS.map((keyword, idx) => (
          <Keypad
            key={idx}
            keyword={keyword}
            handleKeypadClick={handleKeypadClick}
          />
        ))}
      </div>
      <div className={`${commonCSS}`}>
        {MIDDLE_KEYS.map((keyword, idx) => (
          <Keypad
            key={idx}
            keyword={keyword}
            handleKeypadClick={handleKeypadClick}
          />
        ))}
      </div>
      <div className={`${commonCSS}`}>
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
