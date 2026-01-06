"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import { 
  Download, Layout, FileText, Beaker, GraduationCap, 
  BookOpen, UserCircle, UploadCloud, Send,
  Palette, Heart, ExternalLink, ArrowLeft,
  RefreshCw, Github, Facebook, Globe, Sparkles
} from 'lucide-react';
import InputField from '@/components/InputField';

const DEFAULT_LOGO_PATH = "/siu_logo.png";

export default function Home() {
  const [step, setStep] = useState(0); 
  const [coverType, setCoverType] = useState('Assignment');
  const [themeColor, setThemeColor] = useState('#2563EB');
  const [logoPreview, setLogoPreview] = useState<string>(DEFAULT_LOGO_PATH);
  
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

  const departments = [
    "Department of Computer Science and Engineering", 
    "Department of English", 
    "Department of Business Administration", 
    "Department Of Law"
  ];

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans" suppressHydrationWarning>
      {/* HEADER WITH PERSISTENT BACK BUTTON */}
      <header className="bg-white/80 backdrop-blur-md p-4 flex justify-between items-center shadow-sm sticky top-0 z-50 no-print border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2.5 rounded-2xl text-white shadow-lg">
            <Layout size={20} />
          </div>
          <h1 className="font-bold text-gray-800 text-lg hidden sm:block">Academic Creator</h1>
        </div>
        
        {step > 0 && (
          <button 
            onClick={() => setStep(step - 1)} 
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl text-sm font-bold transition-all border border-gray-200"
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}
      </header>

      <main className="p-4 max-w-lg mx-auto flex-grow w-full space-y-8 py-8">
        
        {/* STEP 0: DESIGNER HOME PAGE */}
        {step === 0 && (
          <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700 py-10">
            <div className="relative text-center">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-400/10 blur-3xl rounded-full"></div>
                <div className="inline-flex p-5 bg-white border border-blue-100 rounded-[32px] text-blue-600 shadow-xl mb-6 relative">
                    <GraduationCap size={60} />
                    <div className="absolute -top-2 -right-2 bg-amber-400 text-white p-1.5 rounded-full shadow-lg">
                        <Sparkles size={16} />
                    </div>
                </div>
                <h2 className="text-4xl font-black text-gray-900 leading-tight tracking-tighter">
                    PROFESSIONAL <br/> 
                    <span className="text-blue-600">COVER GENERATOR</span>
                </h2>
                <p className="text-gray-500 font-medium mt-4 px-6 leading-relaxed">
                    Generate high-quality, university-standard Assignment and Lab Report cover pages in seconds.
                </p>
            </div>

            <div className="space-y-4">
                <button 
                    onClick={() => setStep(1)} 
                    className="group relative w-full overflow-hidden py-6 bg-blue-600 text-white font-black rounded-[28px] shadow-2xl transition-all hover:scale-[1.02] active:scale-95"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative flex items-center justify-center gap-3 uppercase tracking-widest text-lg">
                        Get Started <Send size={20} />
                    </span>
                </button>
                <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Free for SIU Students</p>
            </div>
          </div>
        )}

        {/* STEP 1: CHOOSE TYPE */}
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Select Category</h2>
              <p className="text-sm text-gray-500 font-bold uppercase mt-1">What are you creating today?</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <TypeSelectionCard title="Assignment" desc="Theory based projects" icon={<FileText size={32}/>} onClick={() => { setCoverType('Assignment'); setStep(2); }} color="blue" />
              <TypeSelectionCard title="Lab Report" desc="Technical lab results" icon={<Beaker size={32}/>} onClick={() => { setCoverType('Lab Report'); setStep(2); }} color="emerald" />
            </div>
          </div>
        )}

        {/* STEP 2: FILL DATA */}
        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 pb-12">
            
            <FormSection title="University Information" icon={<GraduationCap size={18}/>} gradient="from-blue-600 to-indigo-700">
              
<InputField 
  label="University Name" 
  value={formData.universityName} 
  onChange={(v) => setFormData({...formData, universityName: v})} 
  required 
/>
               <div className="space-y-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">University Department</label>
                 <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={formData.universityDept} onChange={(e) => setFormData({...formData, universityDept: e.target.value})}>
                   {departments.map(d => <option key={d} value={d}>{d}</option>)}
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1"><UploadCloud size={12}/> Change Logo (Optional)</label>
                 <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border-dashed border-2 border-gray-200">
                   <img src={logoPreview} className="w-12 h-12 object-contain bg-white p-1 rounded-lg shadow-sm" alt="Preview" />
                   <input type="file" className="text-xs w-full cursor-pointer" accept="image/*" onChange={handleLogoUpload} />
                 </div>
               </div>
            </FormSection>

            <FormSection title="Subject & Topic" icon={<BookOpen size={18}/>} gradient="from-purple-500 to-pink-600">
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Course Code" value={formData.courseCode} onChange={(v) => setFormData({...formData, courseCode: v})} />
                <InputField label="Course Title" value={formData.courseTitle} onChange={(v) => setFormData({...formData, courseTitle: v})} />
              </div>
              <InputField 
                label={coverType === 'Lab Report' ? "Experiment Name" : "Assignment Topic"} 
                value={formData.topic} 
                onChange={(v) => setFormData({...formData, topic: v})} 
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField 
                    label={coverType === 'Lab Report' ? "Experiment No" : "Assignment No"} 
                    value={formData.labNo} 
                    onChange={(v) => setFormData({...formData, labNo: v})} 
                />
                <InputField label="Submission Date" type="date" value={formData.date} onChange={(v) => setFormData({...formData, date: v})} />
              </div>
            </FormSection>

            <FormSection title="Submitted To" icon={<Send size={18}/>} gradient="from-emerald-500 to-teal-600">
               <InputField label="Teacher Name" value={formData.teacherName} onChange={(v) => setFormData({...formData, teacherName: v})} />
               <InputField label="Designation" value={formData.teacherDesignation} onChange={(v) => setFormData({...formData, teacherDesignation: v})} />
               <div className="space-y-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Teacher Department</label>
                 <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={formData.teacherDept} onChange={(e) => setFormData({...formData, teacherDept: e.target.value})}>
                   {departments.map(d => <option key={d} value={d}>{d}</option>)}
                 </select>
               </div>
            </FormSection>

            <FormSection title="Submitted By" icon={<UserCircle size={18}/>} gradient="from-rose-500 to-orange-600">
               <InputField label="Student Name" value={formData.studentName} onChange={(v) => setFormData({...formData, studentName: v})} />
               <div className="grid grid-cols-2 gap-4">
                  <InputField label="Registration ID" value={formData.studentReg} onChange={(v) => setFormData({...formData, studentReg: v})} />
                  <InputField label="Roll No" value={formData.studentRoll} onChange={(v) => setFormData({...formData, studentRoll: v})} />
               </div>
               <InputField label="Semester/Session" value={formData.studentSemester} onChange={(v) => setFormData({...formData, studentSemester: v})} />
               <div className="space-y-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Student Department</label>
                 <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={formData.studentDept} onChange={(e) => setFormData({...formData, studentDept: e.target.value})}>
                   {departments.map(d => <option key={d} value={d}>{d}</option>)}
                 </select>
               </div>
            </FormSection>

            <button onClick={() => setStep(3)} className="w-full py-5 bg-blue-600 text-white font-black rounded-[24px] shadow-xl hover:bg-blue-700 transition-all uppercase tracking-widest">Preview Design</button>
          </div>
        )}

        {/* STEP 3: PREVIEW & PRINT */}
        {step === 3 && (
          <div className="flex flex-col items-center animate-in zoom-in-95">
            <div className="no-print bg-white p-6 rounded-3xl border shadow-sm w-full mb-8 space-y-6">
               <div className="flex justify-between items-center text-sm font-bold text-black-700 uppercase tracking-tighter">
                 <p className="flex items-center gap-2"><Palette size={18} className="text-pink-500"/> Customize Color</p>
                 <button onClick={() => setStep(2)} className="text-blue-600 underline">Edit Data</button>
               </div>
               <div className="flex flex-wrap gap-4">
                 {['#2563EB', '#000000', '#EC4899', '#059669', '#D97706', '#7C3AED'].map(c => (
                   <button key={c} onClick={() => setThemeColor(c)} className={`w-10 h-10 rounded-2xl border-4 ${themeColor === c ? 'border-gray-200 scale-110 shadow-lg' : 'border-transparent'}`} style={{ backgroundColor: c }} />
                 ))}
               </div>
               <button onClick={handleDownload} className="w-full py-4 bg-blue-600 text-white font-black rounded-xl flex justify-center gap-2 shadow-lg tracking-widest uppercase hover:bg-blue-700 transition-colors"><Download size={20}/> Download PDF</button>
            </div>

            {/* A4 PREVIEW AREA */}
            <div id="print-area" className="bg-white aspect-[210/297] shadow-2xl p-4 flex flex-col items-center relative overflow-hidden" style={{ width: '210mm', height: '297mm' }}>
              
              {/* Double Frame */}
              <div className="absolute inset-4 border-[1px]" style={{ borderColor: themeColor }}>
                <div className="absolute inset-1 border-[3px] border-double" style={{ borderColor: themeColor }}></div>
              </div>

              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <img src={logoPreview} className="w-[120mm] object-contain" alt="Watermark" />
              </div>

              {/* Header: LOGO CENTERED & UNIVERSITY UPPERCASE */}
              <div className="z-10 w-full flex flex-col items-center mt-12">
                <img src={logoPreview} className="w-24 h-24 object-contain mb-6" alt="Logo" />
                <h1 className="text-3xl font-black uppercase tracking-tight text-center leading-tight mb-1" style={{ color: themeColor }}>
                  {formData.universityName.toUpperCase()}
                </h1>
                <p className="text-[12px] font-normal text-black-700 text-center tracking-widest leading-relaxed">
                   {formData.universityDept}
                </p>
                
                <div className="flex items-center justify-center gap-2 mt-6 w-[55%]">
                    <div className="h-px flex-grow opacity-30" style={{ backgroundColor: themeColor }}></div>
                    <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
                    <div className="h-px flex-grow opacity-30" style={{ backgroundColor: themeColor }}></div>
                </div>
              </div>

              {/* Subject Box */}
              <div className="mt-8 w-full max-w-[88%] z-10 py-4">
                <div className="w-full border-[1.5px] rounded-xl overflow-hidden shadow-sm bg-white/50" style={{ borderColor: themeColor }}>
                   <div className="p-4 text-center border-b-[1.5px]" style={{ borderColor: themeColor }}>
                      <h2 className="text-2xl font-black tracking-[0.25em] uppercase" style={{ color: themeColor }}>{coverType}</h2>
                      <div className="text-[11px] font-normal text-black-600 mt-2 space-y-1 ">
                        <p>Course Code: {formData.courseCode}</p>
                        <p>Course Title: {formData.courseTitle}</p>
                      </div>
                   </div>
                   <div className="p-5 text-center bg-white/50">
                      <p className="text-[10px] text-gray-400 font-normal  mb-1">{coverType} No: {formData.labNo}</p>
                      <p className="text-lg font-black  text-gray-900 leading-tight tracking-wide">{formData.topic}</p>
                   </div>
                </div>
              </div>

              {/* Submitted Sections */}
              <div className="w-full flex flex-col gap-10 mt-10 px-14 z-10">
                 <div className="w-[350px] mr-auto border-[1.5px] rounded-2xl p-6 bg-white relative shadow-sm" style={{ borderColor: themeColor }}>
                    <div className="absolute -top-3 left-6 bg-white px-2 text-[10px] font-black  tracking-widest" style={{ color: themeColor }}>Submitted To</div>
                    <h3 className="text-md font-normal text-black-800 leading-tight">{formData.teacherName}</h3>
                    <div className="mt-2 space-y-0.5">
                      <p className="text-[10px] font-normal text-black-500 ">{formData.teacherDesignation}</p>
                      <p className="text-[10px] font-normal text-black-400 ">{formData.teacherDept}</p>
                    </div>
                 </div>

                 <div className="w-[350px] ml-auto border-[1.5px] rounded-2xl p-6 bg-white relative shadow-sm" style={{ borderColor: themeColor }}>
                    <div className="absolute -top-3 left-6 bg-white px-2 text-[10px] font-black  tracking-widest" style={{ color: themeColor }}>Submitted By</div>
                    <h3 className="text-md font-normal text-black-800 leading-tight">{formData.studentName}</h3>
                    <div className="mt-3 space-y-1 text-[11px] font-normal text-gray-600 ">
                        <p><span className="opacity-500">Registraion No:</span> {formData.studentReg}</p>
                        <p><span className="opacity-500">Semester:</span> {formData.studentSemester}</p>
                        <p><span className="opacity-500 text-[10px]">Roll:</span> {formData.studentRoll}</p>
                          <p className="text-[10px] font-normal text-black-400 ">{formData.teacherDept}</p>
                    </div>
                 </div>
              </div>

              {/* Footer Date */}
              <div className="mt-auto mb-10 text-center z-10 w-full">
                 <div className="flex items-center justify-center gap-3 mb-4 opacity-20">
                    <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
                    <div className="h-px w-40" style={{ backgroundColor: themeColor }}></div>
                    <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
                 </div>
                 <p className="text-xs font-black  tracking-[0.2em] text-gray-800">
                    Submission Date: {new Date(formData.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                 </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="no-print bg-white p-8 mt-auto border-t border-gray-100 text-center space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-xl text-blue-600"><Layout size={24}/></div>
            <div className="text-left">
              <h3 className="font-black text-gray-800 uppercase tracking-tighter leading-none">Academic Creator</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Premium Cover Generator</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://fuadhasancse.netlify.app/" className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><Globe size={20}/></a>
            <a href="https://github.com/fuadhasan1122" className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"><Github size={20}/></a>
            <a href="https://www.facebook.com/fhnabik239" className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-blue-700 hover:bg-blue-50 transition-all"><Facebook size={20}/></a>
          </div>
        </div>

        <div className="h-px w-full bg-gray-100"></div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-gray-400 font-medium">© 2026 Academic Creator. All rights reserved.</p>
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-gray-500 bg-gray-50 px-6 py-2 rounded-full border border-gray-100">
            Crafted with <Heart size={16} className="text-red-500 fill-red-500 animate-pulse"/> by 
            <a href="https://fuadhasancse.netlify.app/" target="_blank" className="text-blue-600 flex items-center gap-1 hover:underline">
              Fuad Hasan <ExternalLink size={14}/>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FormSection({ title, icon, gradient, children }: any) {
  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden glass-card">
      <div className={`bg-gradient-to-r ${gradient} p-5 text-white flex items-center gap-3`}>
        <div className="bg-white/20 p-2.5 rounded-2xl border border-white/30">{icon}</div>
        <h3 className="font-black text-[11px] tracking-[2px] uppercase">{title}</h3>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );
}

function TypeSelectionCard({ title, desc, icon, color, onClick }: any) {
  const colors: any = { blue: 'text-blue-500 bg-blue-50', emerald: 'text-emerald-500 bg-emerald-50' };
  return (
    <button onClick={onClick} className="w-full flex items-center gap-6 p-8 bg-white rounded-[32px] border-2 border-transparent hover:border-blue-500 shadow-sm hover:shadow-xl transition-all text-left group">
      <div className={`p-5 rounded-2xl transition-transform group-hover:scale-110 ${colors[color]}`}>{icon}</div>
      <div className="flex-grow">
        <h3 className="font-black text-xl text-gray-800 uppercase tracking-tight">{title}</h3>
        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">{desc}</p>
      </div>
    </button>
  );
}