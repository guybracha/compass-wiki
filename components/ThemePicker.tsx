'use client';
import { useTheme, ACCENTS, AccentColor } from '@/context/ThemeContext';

export default function ThemePicker() {
  const { accent, setAccent } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 mr-1">Theme</span>
      {(Object.entries(ACCENTS) as [AccentColor, typeof ACCENTS[AccentColor]][]).map(([key, val]) => (
        <button
          key={key}
          title={val.label}
          onClick={() => setAccent(key)}
          className="w-5 h-5 rounded-full border-2 transition-transform hover:scale-110"
          style={{
            background: val.primary,
            borderColor: accent === key ? '#fff' : 'transparent',
          }}
          aria-label={`Set theme to ${val.label}`}
        />
      ))}
    </div>
  );
}
