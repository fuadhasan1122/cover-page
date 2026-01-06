"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, Layout, FileText, Beaker, GraduationCap, 
  BookOpen, UserCircle, UploadCloud, Send,
  Palette, Heart, ArrowLeft, Sparkles
} from 'lucide-react';
import InputField from '@/components/InputField';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DEFAULT_LOGO_PATH = "/siu_logo.png";

export default function Home() {
  const [step, setStep] = useState(0); 
  const [coverType, setCoverType] = useState('Assignment');
  const [themeColor, setThemeColor] = useState('#000000'); 
  const [logoPreview, setLogoPreview] = useState<string>(DEFAULT_LOGO_PATH);
  const [isDownloading, setIsDownloading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const [formData, setFormData] = useState({
    universityName: "Sylhet International University",
    universityDept: "Department of Computer Science and Engineering",
    courseCode: "CSE",
    courseTitle: "",
    topic: "", 
    labNo: "01",
    studentName: "",
    studentReg: "",
    studentRoll: "",
    studentSemester: "",
    studentDept: "Department of Computer Science and Engineering",
    teacherName: "",
    teacherDesignation: "",
    teacherDept: "Department of Computer Science and Engineering",
    date: new Date().toISOString().split('T')[0]
  });

  const downloadPDF = async () => {
    if (!printRef.current) return;
    setIsDownloading(true);
    
    try {
      const element = printRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // Optimized for mobile performance vs quality
        useCORS: true,
        backgroundColor: "#ffffff"
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save(`${formData.studentName || 'Cover'}.pdf`);
    } catch (error) {
      console.error("Download failed", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <header className="bg-white/80 backdrop-blur-md p-4 flex justify-between items-center shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-black p-2 rounded-xl text-white shadow-lg">
            <Layout size={20} />
          </div>
          <h1 className="font-bold text-black text-lg">Academic Creator</h1>
        </div>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-black rounded-xl text-sm font-bold border border-gray-200">
            <ArrowLeft size={16} /> Back
          </button>
        )}
      </header>

      <main className="flex-grow w-full max-w-4xl mx-auto p-4 py-8">
        {step === 0 && (
          <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in-95">
             <div className="relative inline-flex">
                <div className="p-6 bg-white border border-gray-100 rounded-[32px] text-black shadow-2xl">
                    <GraduationCap size={64} />
                    <Sparkles className="absolute top-2 right-2 text-yellow-500" size={20} />
                </div>
            </div>
            <h2 className="text-3xl font-black text-black uppercase tracking-tighter">Academic Cover <br/> Generator</h2>
            <button onClick={() => setStep(1)} className="w-full max-w-sm py-5 bg-black text-white font-black rounded-3xl shadow-xl uppercase tracking-widest text-lg">
              Get Started
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
            <h2 className="text-xl font-black text-center mb-4">SELECT TYPE</h2>
            <button onClick={() => { setCoverType('Assignment'); setStep(2); }} className="p-6 bg-white rounded-3xl border-2 border-gray-100 flex items-center gap-4 text-left shadow-sm">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><FileText/></div>
                <div><h3 className="font-bold">Assignment</h3><p className="text-xs text-gray-400">Theory Projects</p></div>
            </button>
            <button onClick={() => { setCoverType('Lab Report'); setStep(2); }} className="p-6 bg-white rounded-3xl border-2 border-gray-100 flex items-center gap-4 text-left shadow-sm">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><Beaker/></div>
                <div><h3 className="font-bold">Lab Report</h3><p className="text-xs text-gray-400">Practical Experiments</p></div>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 max-w-md mx-auto">
            <FormSection title="Information" gradient="from-black to-zinc-800">
                <InputField label="Student Name" value={formData.studentName} onChange={(v:string) => setFormData({...formData, studentName: v})} />
                <InputField label="Topic" value={formData.topic} onChange={(v:string) => setFormData({...formData, topic: v})} />
                <button onClick={() => setStep(3)} className="w-full py-4 bg-black text-white font-black rounded-2xl shadow-xl">Preview Cover</button>
            </FormSection>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center">
            {/* Action Card */}
            <div className="bg-white p-5 rounded-3xl border shadow-sm w-full max-w-md mb-6 space-y-4">
               <button onClick={downloadPDF} disabled={isDownloading} className="w-full py-4 bg-black text-white font-black rounded-xl flex justify-center gap-2 shadow-lg disabled:bg-gray-400">
                 {isDownloading ? "Generating..." : "Download PDF"} <Download size={20}/>
               </button>
               <button onClick={() => setStep(2)} className="w-full text-xs font-bold text-center underline uppercase">Edit Details</button>
            </div>

            {/* LARGE MOBILE PREVIEW CONTAINER */}
            <div className="w-full overflow-hidden flex justify-center bg-gray-100 rounded-xl p-2 md:p-10 border border-gray-200">
                {/* Responsive Scaling Logic: 
                    The inner div is exactly A4 (210mm). 
                    The outer container and scale logic make it fit nicely on small screens.
                */}
                <div className="preview-scaler origin-top">
                    <div 
                        ref={printRef}
                        className="bg-white shadow-2xl flex flex-col items-center relative overflow-hidden" 
                        style={{ width: '210mm', height: '297mm', minHeight: '297mm' }}
                    >
                        <div className="absolute inset-4 border-[1px] border-black">
                            <div className="absolute inset-1 border-[3px] border-double border-black"></div>
                        </div>

                        <div className="z-10 w-full flex flex-col items-center mt-16 text-black px-10">
                            <img src={logoPreview} className="w-24 h-24 object-contain mb-6" alt="Logo" />
                            <h1 className="text-3xl font-black uppercase text-center leading-tight mb-2">
                                {formData.universityName.toUpperCase()}
                            </h1>
                            <p className="text-sm font-normal text-center tracking-widest">{formData.universityDept}</p>
                            
                            <div className="w-3/4 h-px bg-black/20 my-8"></div>

                            <div className="w-full border-2 border-black rounded-xl p-8 text-center bg-white">
                                <h2 className="text-3xl font-black tracking-widest uppercase mb-4">{coverType}</h2>
                                <p className="text-lg font-normal mb-6">Course Code: {formData.courseCode}</p>
                                <p className="text-xl font-black uppercase border-t-2 border-dashed border-black/10 pt-6">
                                    {formData.topic}
                                </p>
                            </div>

                            <div className="w-full grid grid-cols-1 gap-8 mt-12 px-6">
                                <div className="border-l-4 border-black pl-6 py-2">
                                    <p className="text-[10px] font-black uppercase text-gray-400">Submitted To</p>
                                    <h3 className="text-xl font-normal">{formData.teacherName || "The Course Teacher"}</h3>
                                </div>
                                <div className="border-r-4 border-black pr-6 py-2 text-right">
                                    <p className="text-[10px] font-black uppercase text-gray-400">Submitted By</p>
                                    <h3 className="text-xl font-normal">{formData.studentName || "The Student"}</h3>
                                    <p className="text-sm">ID: {formData.studentReg}</p>
                                </div>
                            </div>

                            <div className="mt-auto mb-10">
                                <p className="text-sm font-black uppercase tracking-widest">
                                    Date: {new Date(formData.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="p-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
          Created with <Heart size={12} className="inline text-red-500 fill-red-500"/> by Fuad Hasan
      </footer>

      <style jsx global>{`
        /* SCALE THE PREVIEW FOR MOBILE */
        .preview-scaler {
            transform: scale(0.4); /* Default for small mobile */
        }
        @media (min-width: 480px) {
            .preview-scaler { transform: scale(0.55); }
        }
        @media (min-width: 640px) {
            .preview-scaler { transform: scale(0.7); }
        }
        @media (min-width: 768px) {
            .preview-scaler { transform: scale(1); }
        }

        /* Essential for maintaining width during JS capture */
        #print-area {
            flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}

function FormSection({ title, gradient, children }: any) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className={`bg-gradient-to-r ${gradient} p-4 text-white font-black uppercase text-xs tracking-widest`}>
        {title}
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}