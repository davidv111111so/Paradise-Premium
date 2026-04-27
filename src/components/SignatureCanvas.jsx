import React, { useState, useRef, useEffect } from 'react';
import { PenTool, Type } from 'lucide-react';

const SignatureCanvas = ({ onSave, label, defaultValue = null }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState('draw'); // 'draw' or 'type'
  const [typedName, setTypedName] = useState('');
  const [hasSignature, setHasSignature] = useState(!!defaultValue);

  useEffect(() => {
    if (mode === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    }
  }, [mode]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (mode === 'draw') {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    } else {
      setTypedName('');
    }
    setHasSignature(false);
  };

  const handleApply = () => {
    if (mode === 'draw') {
      const dataUrl = canvasRef.current.toDataURL();
      onSave(dataUrl);
    } else {
      if (!typedName) return;
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 120;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 300, 120);
      ctx.font = 'italic 30px "Playfair Display", serif';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.fillText(typedName, 150, 70);
      onSave(canvas.toDataURL());
    }
  };

  return (
    <div className="bg-white/5 p-4 rounded-3xl border border-white/10">
      <div className="flex justify-between items-center mb-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#B8734A] flex items-center gap-2">
          <PenTool size={12} /> {label}
        </p>
        <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
          <button 
            type="button"
            onClick={() => setMode('draw')}
            className={`p-1 rounded ${mode === 'draw' ? 'bg-[#B8734A] text-white' : 'text-paradise-400'}`}
          >
            <PenTool size={12} />
          </button>
          <button 
            type="button"
            onClick={() => setMode('type')}
            className={`p-1 rounded ${mode === 'type' ? 'bg-[#B8734A] text-white' : 'text-paradise-400'}`}
          >
            <Type size={12} />
          </button>
        </div>
      </div>
      
      {mode === 'draw' ? (
        <canvas
          ref={canvasRef}
          width={300}
          height={120}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            const rect = canvasRef.current.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            const ctx = canvasRef.current.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(x, y);
            setIsDrawing(true);
          }}
          onTouchMove={(e) => {
            if (!isDrawing) return;
            const touch = e.touches[0];
            const rect = canvasRef.current.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            const ctx = canvasRef.current.getContext('2d');
            ctx.lineTo(x, y);
            ctx.stroke();
            e.preventDefault();
            setHasSignature(true);
          }}
          onTouchEnd={stopDrawing}
          className="bg-white rounded-xl cursor-crosshair w-full touch-none shadow-inner"
        />
      ) : (
        <input 
          type="text"
          value={typedName}
          onChange={(e) => {
            setTypedName(e.target.value);
            setHasSignature(e.target.value.length > 0);
          }}
          placeholder="Escribe tu nombre..."
          className="w-full h-[120px] bg-white rounded-xl text-center text-3xl italic font-serif text-black focus:outline-none shadow-inner"
        />
      )}

      <div className="flex gap-2 mt-3">
        <button type="button" onClick={clearCanvas} className="flex-1 py-2 text-[10px] font-bold uppercase bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all">
          Limpiar
        </button>
        <button type="button" onClick={handleApply} disabled={!hasSignature} className="flex-1 py-2 text-[10px] font-bold uppercase bg-[#1A4D2E] text-white rounded-lg disabled:opacity-50 hover:bg-[#1A4D2E]/80 transition-all">
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default SignatureCanvas;
