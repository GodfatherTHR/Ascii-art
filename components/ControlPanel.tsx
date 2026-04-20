import React from 'react';
import { AsciiOptions, DENSITY_MAPS } from '../types';
import { Sliders, Monitor, Type, Palette } from 'lucide-react';
import { playButtonSound } from '../utils/soundEffects';

interface ControlPanelProps {
  options: AsciiOptions;
  setOptions: React.Dispatch<React.SetStateAction<AsciiOptions>>;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ options, setOptions }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const handleChange = (key: keyof AsciiOptions, value: any) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleModeChange = (key: keyof AsciiOptions, value: any) => {
      playButtonSound();
      handleChange(key, value);
  }

  return (
    <div className={`absolute bottom-0 w-full bg-black/90 border-t border-green-900/50 backdrop-blur-md z-30 transition-all duration-300 pb-[env(safe-area-inset-bottom)] ${isCollapsed ? 'translate-y-[calc(100%-40px-env(safe-area-inset-bottom))]' : 'translate-y-0'}`}>
      
      {/* Toggle Button */}
      <button 
        onClick={() => {
            playButtonSound();
            setIsCollapsed(!isCollapsed);
        }}
        className="w-full h-10 flex items-center justify-center bg-green-900/20 hover:bg-green-900/40 text-green-700 text-[10px] tracking-widest uppercase cursor-pointer border-b border-green-900/20"
      >
        {isCollapsed ? '[+] SYSTEM CONFIGURATION' : '[-] CLOSE CONFIGURATION'}
      </button>

      <div className="max-w-6xl mx-auto flex flex-wrap gap-4 md:gap-8 p-4 md:p-6 justify-center items-start text-green-500 text-xs font-mono overflow-y-auto max-h-[60vh]">
        
        {/* Font Size */}
        <div className="flex flex-col gap-1 w-full sm:w-32 lg:w-40">
          <div className="flex items-center justify-between mb-1">
             <div className="flex items-center gap-2">
                <Type className="w-3 h-3" />
                <label className="text-[10px] md:text-xs">FONT</label>
             </div>
             <span className="text-[10px] text-green-700">{options.fontSize}px</span>
          </div>
          <input 
            type="range" 
            min="6" 
            max="24" 
            value={options.fontSize} 
            onChange={(e) => handleChange('fontSize', Number(e.target.value))}
            className="accent-green-500 h-1 bg-green-900 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Brightness */}
        <div className="flex flex-col gap-1 w-full sm:w-32 lg:w-40">
           <div className="flex items-center justify-between mb-1">
             <div className="flex items-center gap-2">
                <Sliders className="w-3 h-3" />
                <label className="text-[10px] md:text-xs">GAIN</label>
             </div>
             <span className="text-[10px] text-green-700">{options.brightness.toFixed(1)}</span>
           </div>
          <input 
            type="range" 
            min="0.5" 
            max="2.0" 
            step="0.1" 
            value={options.brightness} 
            onChange={(e) => handleChange('brightness', Number(e.target.value))}
            className="accent-green-500 h-1 bg-green-900 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Contrast */}
        <div className="flex flex-col gap-1 w-full sm:w-32 lg:w-40">
           <div className="flex items-center justify-between mb-1">
             <div className="flex items-center gap-2">
                <Monitor className="w-3 h-3" />
                <label className="text-[10px] md:text-xs">DYN RANGE</label>
             </div>
             <span className="text-[10px] text-green-700">{options.contrast.toFixed(1)}</span>
           </div>
          <input 
            type="range" 
            min="0.5" 
            max="3.0" 
            step="0.1" 
            value={options.contrast} 
            onChange={(e) => handleChange('contrast', Number(e.target.value))}
            className="accent-green-500 h-1 bg-green-900 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Color Mode */}
        <div className="flex flex-col gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2">
                <Palette className="w-3 h-3 text-green-700" />
                <span className="text-[10px] md:text-xs">MODES</span>
            </div>
            <div className="grid grid-cols-2 sm:flex gap-1">
                {(['matrix', 'bw', 'retro', 'color'] as const).map(mode => (
                    <button
                        key={mode}
                        onClick={() => handleModeChange('colorMode', mode)}
                        className={`px-3 py-1.5 md:px-2 md:py-1 border ${options.colorMode === mode ? 'bg-green-500 text-black border-green-500' : 'bg-transparent border-green-900 text-green-700 hover:border-green-500 md:hover:text-green-400'} text-[9px] md:text-[10px] uppercase transition-colors rounded-sm shadow-inner`}
                    >
                        {mode}
                    </button>
                ))}
            </div>
        </div>

        {/* Density Map */}
        <div className="flex flex-col gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2">
                <Type className="w-3 h-3 text-green-700" />
                <span className="text-[10px] md:text-xs">GLYPHS</span>
            </div>
            <div className="grid grid-cols-2 sm:flex gap-1">
                {(Object.keys(DENSITY_MAPS) as Array<keyof typeof DENSITY_MAPS>).map(mode => (
                    <button
                        key={mode}
                        onClick={() => handleModeChange('density', mode)}
                        className={`px-3 py-1.5 md:px-2 md:py-1 border ${options.density === mode ? 'bg-green-500 text-black border-green-500' : 'bg-transparent border-green-900 text-green-700 hover:border-green-500 md:hover:text-green-400'} text-[9px] md:text-[10px] uppercase transition-colors rounded-sm`}
                    >
                        {mode}
                    </button>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};