import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import './index.css'

const supabase = createClient(
  'https://mmgfljenqguddykevqkw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tZ2ZsamVucWd1ZGR5a2V2cWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Mzc1NTksImV4cCI6MjA4OTUxMzU1OX0.GEGa2mbnXxpYHWxZ3sE4fvGLwsJapBvbQDIOSVKUgns'
)

function useToast() {
  const [toasts, setToasts] = useState([])
  const addToast = (message, type = 'info') => {
    const id = Date.now()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000)
  }
  return { toasts, addToast }
}

function ToastContainer({ toasts }) {
  return (
    <div style={{ position:'fixed', bottom:24, right:24, zIndex:10000, display:'flex', flexDirection:'column', gap:10 }}>
      {toasts.map(t => (
        <div key={t.id} style={{ background:'#111111', border:'1px solid #2a2a2a', borderLeft:`3px solid ${t.type==='success'?'#22c55e':t.type==='error'?'#E8000D':'#F5F5F5'}`, padding:'14px 20px', fontSize:13, color:'#F5F5F5', display:'flex', alignItems:'center', gap:10, minWidth:260 }}>
          <span>{t.type==='success'?'✓':'✕'}</span>{t.message}
        </div>
      ))}
    </div>
  )
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return isMobile
}

function WelcomePopup({ onSignIn, onSignUp, onClose }) {
  const isMobile = useIsMobile()
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.88)', backdropFilter:'blur(12px)', zIndex:900, display:'flex', alignItems:'center', justifyContent:'center', padding:isMobile?16:24 }} onClick={onClose}>
      <div style={{ background:'#111111', border:'1px solid #2a2a2a', borderTop:'2px solid #E8000D', padding:isMobile?'32px 24px':48, width:'100%', maxWidth:460, position:'relative', textAlign:'center' }} onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{ position:'absolute', top:14, right:14, background:'none', border:'none', color:'#6a6a6a', fontSize:20, cursor:'pointer', fontFamily:"'Share Tech Mono',monospace" }}>✕</button>
        <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}><Logo /></div>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:isMobile?32:42, fontWeight:900, textTransform:'uppercase', lineHeight:0.9, marginBottom:12, color:'#F5F5F5' }}>
          GET <span style={{color:'#E8000D'}}>BUILT.</span>
        </h2>
        <p style={{ color:'#aaaaaa', fontSize:isMobile?13:15, lineHeight:1.8, fontWeight:300, marginBottom:28, maxWidth:340, margin:'0 auto 28px' }}>
          Precision macro targets, training intelligence, and AI physique rating — built by a real coach.
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <button onClick={onSignUp} style={{ width:'100%', background:'#E8000D', color:'#080808', fontFamily:"'Share Tech Mono',monospace", fontSize:11, letterSpacing:2, textTransform:'uppercase', border:'none', padding:'15px', cursor:'pointer', fontWeight:600, clipPath:'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))' }}>
            Create Account →
          </button>
          <button onClick={onSignIn} style={{ width:'100%', background:'transparent', color:'#aaaaaa', fontFamily:"'Share Tech Mono',monospace", fontSize:11, letterSpacing:2, textTransform:'uppercase', border:'1px solid #2a2a2a', padding:'14px', cursor:'pointer' }}>
            I Already Have An Account
          </button>
        </div>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:'#6a6a6a', letterSpacing:1.5, marginTop:18, lineHeight:1.6 }}>
          Join the waitlist · Lock in founding member pricing
        </div>
      </div>
    </div>
  )
}

function Logo({ size = 'default' }) {
  const logoH = size === 'large' ? 22 : 16
  const builtSize = size === 'large' ? 22 : 16
  const bySize = size === 'large' ? 13 : 10
  return (
    <div style={{ display:'flex', alignItems:'center', gap:size==='large'?8:6, cursor:'pointer' }}>
      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:builtSize, fontWeight:900, letterSpacing:4, textTransform:'uppercase', color:'#F5F5F5', lineHeight:1 }}>BUILT</div>
      <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:bySize, letterSpacing:2, textTransform:'uppercase', color:'#E8000D', lineHeight:1 }}>by</div>
      <img src="/yelyk-logo-only.png" alt="YELYK" style={{ height:logoH, width:'auto' }} />
    </div>
  )
}

function Navbar({ isLoggedIn, isPro, onSignIn, onSignOut, activeTab, setActiveTab }) {
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useIsMobile()
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' })
  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:500, display:'flex', alignItems:'center', justifyContent:'space-between', padding: scrolled?(isMobile?'10px 16px':'12px 40px'):(isMobile?'14px 16px':'18px 40px'), background: scrolled?'rgba(8,8,8,0.98)':'rgba(8,8,8,0.92)', backdropFilter:'blur(20px)', borderBottom:'1px solid #1e1e1e', transition:'all 0.3s' }}>
      <div onClick={() => window.scrollTo({top:0,behavior:'smooth'})}><Logo /></div>
      {isLoggedIn ? (
        null
      ) : (
        !isMobile && (
          <div style={{ display:'flex', gap:28 }}>
            {['features','pricing','faq','waitlist'].map(id => (
              <button key={id} onClick={() => scrollTo(id)} style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:'2px', textTransform:'uppercase', color:'#6a6a6a', background:'none', border:'none', cursor:'pointer' }}
                onMouseOver={e=>e.target.style.color='#F5F5F5'} onMouseOut={e=>e.target.style.color='#6a6a6a'}>
                {id==='waitlist'?'Early Access':id.charAt(0).toUpperCase()+id.slice(1)}
              </button>
            ))}
          </div>
        )
      )}
      <div style={{ display:'flex', gap:isMobile?6:10, alignItems:'center' }}>
        {isLoggedIn ? (
          <button onClick={onSignOut} style={{ fontFamily:"'Barlow',sans-serif", fontSize:isMobile?11:13, fontWeight:500, letterSpacing:'1.5px', textTransform:'uppercase', color:'#aaaaaa', background:'none', border:'1px solid #2a2a2a', padding:isMobile?'8px 14px':'10px 20px', cursor:'pointer' }}>Sign Out</button>
        ) : (
          <>
            <button onClick={onSignIn} style={{ fontFamily:"'Barlow',sans-serif", fontSize:isMobile?11:13, fontWeight:500, letterSpacing:isMobile?'1px':'1.5px', textTransform:'uppercase', color:'#aaaaaa', background:'none', border:'1px solid #2a2a2a', padding:isMobile?'8px 14px':'10px 20px', cursor:'pointer' }}>Sign In</button>
            <button onClick={() => scrollTo('waitlist')} style={{ fontFamily:"'Barlow',sans-serif", fontSize:isMobile?11:13, fontWeight:600, letterSpacing:isMobile?'1px':'1.5px', textTransform:'uppercase', background:'#E8000D', color:'#080808', border:'none', padding:isMobile?'9px 14px':'11px 22px', cursor:'pointer', clipPath:'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))' }}>Get Started</button>
          </>
        )}
      </div>
    </nav>
  )
}

function AuthModal({ isOpen, onClose, onSuccess, addToast, initialTab, initialEmail, onWaitlistJoined }) {
  const [tab, setTab] = useState(initialTab || 'signin')
  const [email, setEmail] = useState(initialEmail || '')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (isOpen) {
      if (initialTab) setTab(initialTab)
      if (initialEmail) setEmail(initialEmail)
      setPassword('');setConfirm('');setError('');setMessage('')
    }
  }, [isOpen, initialTab, initialEmail])

  if (!isOpen) return null
  const handleSignIn = async () => {
    if (!email||!password){setError('Please fill in all fields');return}
    setLoading(true);setError('')
    const {error:e} = await supabase.auth.signInWithPassword({email,password})
    setLoading(false)
    if(e){setError(e.message);return}
    addToast('Signed in!','success');onSuccess();onClose()
  }
  const handleSignUp = async () => {
    if (!email||!password||!confirm){setError('Please fill in all fields');return}
    if (password.length<8){setError('Password must be at least 8 characters');return}
    if (password!==confirm){setError('Passwords do not match');return}
    setLoading(true);setError('')
    const {data,error:e} = await supabase.auth.signUp({email,password})
    setLoading(false)
    if(e){setError(e.message);return}
    if(data.user && !data.user.identities?.length){
      setError('An account with this email already exists. Try signing in.');return
    }
    if(data.user) {
      await supabase.from('user_profiles').insert({id:data.user.id,email,plan:'free'}).select()
      await supabase.from('waitlist').insert({ email: email.trim().toLowerCase() }).select()
      if (onWaitlistJoined) onWaitlistJoined()
    }
    setMessage('Account created! You\'re on the waitlist. Check your email to confirm.')
  }
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(8px)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }} onClick={onClose}>
      <div style={{ background:'#111111', border:'1px solid #2a2a2a', borderTop:'2px solid #E8000D', padding:40, width:'100%', maxWidth:420, position:'relative' }} onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{ position:'absolute', top:16, right:16, background:'none', border:'none', color:'#6a6a6a', fontSize:20, cursor:'pointer' }}>✕</button>
        <div style={{ textAlign:'center', marginBottom:28 }}><Logo /></div>
        <div style={{ display:'flex', marginBottom:24, borderBottom:'1px solid #1e1e1e' }}>
          {['signin','signup'].map(t => (
            <button key={t} onClick={() => {setTab(t);setError('');setMessage('')}} style={{ flex:1, padding:'12px', background:'none', border:'none', fontFamily:"'Share Tech Mono',monospace", fontSize:10, letterSpacing:2, textTransform:'uppercase', cursor:'pointer', color:tab===t?'#F5F5F5':'#6a6a6a', borderBottom:tab===t?'2px solid #E8000D':'2px solid transparent' }}>
              {t==='signin'?'Sign In':'Sign Up'}
            </button>
          ))}
        </div>
        {message ? (
          <div style={{ padding:20, background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.25)', color:'#22c55e', fontFamily:"'Share Tech Mono',monospace", fontSize:12, textAlign:'center', lineHeight:1.8 }}>
            ✓ {message}
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {tab==='signup'&&(
              <div style={{background:'rgba(232,0,13,0.06)',border:'1px solid rgba(232,0,13,0.15)',padding:'10px 14px',fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'#E8000D',letterSpacing:1,textAlign:'center',lineHeight:1.6}}>
                Create an account to join the waitlist &amp; lock in founding member pricing
              </div>
            )}
            {[['Email','email',email,setEmail,'your@email.com'],['Password','password',password,setPassword,'••••••••']].map(([label,type,val,setter,ph]) => (
              <div key={label}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'#aaaaaa', marginBottom:8 }}>{label}</div>
                <input type={type} value={val} onChange={e=>setter(e.target.value)} placeholder={ph}
                  style={{ width:'100%', background:'#0d0d0d', border:'1px solid #2a2a2a', color:'#F5F5F5', fontFamily:"'Barlow',sans-serif", fontSize:15, padding:'12px 16px', outline:'none' }}
                  onFocus={e=>e.target.style.borderColor='#E8000D'} onBlur={e=>e.target.style.borderColor='#2a2a2a'} />
              </div>
            ))}
            {tab==='signup'&&(
              <div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'#aaaaaa', marginBottom:8 }}>Confirm Password</div>
                <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="••••••••"
                  style={{ width:'100%', background:'#0d0d0d', border:'1px solid #2a2a2a', color:'#F5F5F5', fontFamily:"'Barlow',sans-serif", fontSize:15, padding:'12px 16px', outline:'none' }} />
              </div>
            )}
            {error&&<div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#E8000D', letterSpacing:1 }}>{error}</div>}
            <button onClick={tab==='signin'?handleSignIn:handleSignUp} disabled={loading}
              style={{ background:'#E8000D', color:'#080808', fontFamily:"'Share Tech Mono',monospace", fontSize:11, letterSpacing:2, textTransform:'uppercase', border:'none', padding:'15px', cursor:'pointer', fontWeight:600, marginTop:8 }}>
              {loading?'Loading...':tab==='signin'?'Sign In':'Create Account & Join Waitlist'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function Paywall({ feature, onUpgrade }) {
  return (
    <div style={{ padding:'80px 40px', textAlign:'center', minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ maxWidth:440 }}>
        <div style={{ fontSize:52, marginBottom:20 }}>🔒</div>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:52, fontWeight:900, textTransform:'uppercase', color:'#F5F5F5', marginBottom:14, lineHeight:0.9 }}>
          {feature}<br/><span style={{color:'#E8000D'}}>is Pro</span>
        </h2>
        <p style={{ color:'#aaaaaa', fontSize:15, lineHeight:1.8, fontWeight:300, marginBottom:32 }}>Upgrade to Pro to unlock {feature} plus unlimited macro calculations, meal timing, and AI physique rating.</p>
        <button onClick={onUpgrade} style={{ background:'#E8000D', color:'#080808', fontFamily:"'Share Tech Mono',monospace", fontSize:12, letterSpacing:2, textTransform:'uppercase', border:'none', padding:'16px 40px', cursor:'pointer', fontWeight:600 }}>
          Upgrade to Pro — $12.99/mo →
        </button>
      </div>
    </div>
  )
}

function MacroCalculator({ isPro, onUpgrade, addToast, onMacrosCalculated }) {
  const isMobile = useIsMobile()
  const [form, setForm] = useState({
    age:'', gender:'male', feet:'5', inches:'10',
    weight:'', activity:'moderately', goal:'maintain',
    stepsPerDay:'7500', workoutDays:'3',
    workoutDuration:'60', workoutIntensity:'moderate'
  })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  const getDailyCount = () => {
    const today = new Date().toDateString()
    if(localStorage.getItem('bby_calc_date')!==today){
      localStorage.setItem('bby_calc_date',today)
      localStorage.setItem('bby_calc_count','0')
      return 0
    }
    return parseInt(localStorage.getItem('bby_calc_count')||'0')
  }
  const limitReached = !isPro && getDailyCount()>=2

  const validate = () => {
    const e={}
    if(!form.age||form.age<13||form.age>80) e.age='Age must be 13-80'
    if(!form.weight||form.weight<50||form.weight>500) e.weight='Weight must be 50-500 lbs'
    setErrors(e)
    return Object.keys(e).length===0
  }

  const calculate = async () => {
    if(!validate()) return
    if(limitReached){onUpgrade();return}
    setLoading(true)
    await new Promise(r=>setTimeout(r,800))
    const lbs=parseFloat(form.weight)
    const kg=lbs/2.205
    const cm=((parseInt(form.feet)*12)+parseInt(form.inches))*2.54
    const age=parseInt(form.age)
    const baseMultipliers={sedentary:1.2,lightly:1.375,moderately:1.55,very:1.725,extremely:1.9}
    const steps=parseInt(form.stepsPerDay)
    const stepsAdjustment=((steps-7500)/2000)*0.025
    const wDays=parseInt(form.workoutDays)
    const wDuration=parseInt(form.workoutDuration)
    const metValues={light:4,moderate:6,hard:8,very_hard:10}
    const met=metValues[form.workoutIntensity]
    const weeklyWorkoutCals=met*kg*(wDuration/60)*wDays
    const dailyWorkoutBonus=weeklyWorkoutCals/7
    const finalMultiplier=baseMultipliers[form.activity]+stepsAdjustment
    const goalAdj={aggressive_cut:-500,moderate_cut:-250,maintain:0,lean_bulk:300,bulk:500}
    let bmr=form.gender==='male'?(10*kg)+(6.25*cm)-(5*age)+5:(10*kg)+(6.25*cm)-(5*age)-161
    const tdee=(bmr*finalMultiplier)+dailyWorkoutBonus
    let calories=tdee+goalAdj[form.goal]
    const isCutting=form.goal.includes('cut')
    const protein=Math.round(isCutting?lbs*1.2:lbs*1.0)
    const fats=Math.round(lbs*0.35)
    let carbs=Math.round((calories-protein*4-fats*9)/4)
    if(carbs<50){carbs=100;calories=protein*4+fats*9+carbs*4}
    const waterOz=Math.round(lbs*0.5+(steps/1000)*2+wDays*8)
    const fiberMin=Math.round(calories/1000*10)
    const fiberMax=Math.round(calories/1000*14)
    const res={
      calories:Math.round(calories),protein,carbs,fats,
      bmr:Math.round(bmr),tdee:Math.round(tdee),
      dailyWorkoutBonus:Math.round(dailyWorkoutBonus),
      waterOz,fiber:`${fiberMin}-${fiberMax}g`
    }
    setResults(res)
    if(onMacrosCalculated) onMacrosCalculated(res)
    localStorage.setItem('bby_calc_count',String(getDailyCount()+1))
    addToast('Macros calculated!','success')
    setLoading(false)
  }

  const goals=[
    {k:'aggressive_cut',l:'Aggressive Cut',s:'-500 cal'},
    {k:'moderate_cut',l:'Moderate Cut',s:'-250 cal'},
    {k:'maintain',l:'Maintain',s:'±0 cal'},
    {k:'lean_bulk',l:'Lean Bulk',s:'+300 cal'},
    {k:'bulk',l:'Bulk',s:'+500 cal'},
  ]

  const IS={width:'100%',background:'#0d0d0d',border:'1px solid #2a2a2a',color:'#F5F5F5',fontFamily:"'Barlow',sans-serif",fontSize:16,padding:'13px 16px',outline:'none'}
  const LS={fontFamily:"'Barlow',sans-serif",fontSize:13,fontWeight:500,letterSpacing:1,textTransform:'uppercase',color:'#cccccc',marginBottom:8,display:'block'}

  return (
    <div style={{padding:isMobile?'24px 16px':'40px',maxWidth:1200,margin:'0 auto'}}>
      <div style={{marginBottom:isMobile?24:36}}>
        <div style={{display:'flex',alignItems:'center',gap:10,fontFamily:"'Barlow',sans-serif",fontSize:13,fontWeight:500,letterSpacing:3,textTransform:'uppercase',color:'#E8000D',marginBottom:10}}>
          <span style={{width:20,height:1,background:'#E8000D',opacity:0.4}}/>Macro Engine<span style={{width:32,height:1,background:'#E8000D',opacity:0.4}}/>
        </div>
        <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:isMobile?'clamp(32px,8vw,48px)':'clamp(36px,5vw,64px)',fontWeight:900,textTransform:'uppercase',lineHeight:0.9}}>
          Your Exact<br/><span style={{color:'#E8000D'}}>Targets.</span>
        </h2>
      </div>
      {limitReached&&(
        <div style={{background:'rgba(232,0,13,0.08)',border:'1px solid rgba(232,0,13,0.3)',padding:'14px 20px',marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
          <span style={{fontFamily:"'Barlow',sans-serif",fontSize:13,fontWeight:500,color:'#E8000D',letterSpacing:0.5}}>⚡ 2 free calculations used today. Upgrade for unlimited.</span>
          <button onClick={onUpgrade} style={{background:'#E8000D',color:'#080808',fontFamily:"'Barlow',sans-serif",fontSize:12,fontWeight:700,letterSpacing:2,textTransform:'uppercase',border:'none',padding:'10px 20px',cursor:'pointer'}}>Upgrade →</button>
        </div>
      )}
      <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:isMobile?16:20}}>
        <div style={{background:'#111111',border:'1px solid #1e1e1e',padding:32}}>
          <div style={{fontFamily:"'Barlow',sans-serif",fontSize:14,fontWeight:600,letterSpacing:3,textTransform:'uppercase',color:'#E8000D',marginBottom:24,display:'flex',alignItems:'center',gap:8}}>
            <span style={{flex:1,height:1,background:'#E8000D',opacity:0.3}}/>Your Stats<span style={{flex:1,height:1,background:'#E8000D',opacity:0.3}}/>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:18}}>
            <div>
              <label style={LS}>Age</label>
              <input type="number" value={form.age} onChange={e=>set('age',e.target.value)} placeholder="22" style={{...IS,borderColor:errors.age?'#E8000D':'#2a2a2a'}}/>
              {errors.age&&<div style={{fontFamily:"'Barlow',sans-serif",fontSize:12,color:'#E8000D',marginTop:4}}>{errors.age}</div>}
            </div>
            <div>
              <label style={LS}>Gender</label>
              <div style={{display:'flex'}}>
                {['male','female'].map(g=>(
                  <button key={g} onClick={()=>set('gender',g)} style={{flex:1,padding:'12px',fontFamily:"'Barlow',sans-serif",fontSize:13,fontWeight:600,letterSpacing:2,textTransform:'uppercase',cursor:'pointer',border:'1px solid #2a2a2a',background:form.gender===g?'#E8000D':'#0d0d0d',color:form.gender===g?'#080808':'#cccccc',fontWeight:form.gender===g?600:400}}>{g.toUpperCase()}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={LS}>Height</label>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                <select value={form.feet} onChange={e=>set('feet',e.target.value)} style={IS}>
                  {[4,5,6,7].map(f=><option key={f} value={f}>{f} ft</option>)}
                </select>
                <select value={form.inches} onChange={e=>set('inches',e.target.value)} style={IS}>
                  {Array.from({length:12},(_,i)=>i).map(i=><option key={i} value={i}>{i} in</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={LS}>Weight (lbs)</label>
              <input type="number" value={form.weight} onChange={e=>set('weight',e.target.value)} placeholder="175" style={{...IS,borderColor:errors.weight?'#E8000D':'#2a2a2a'}}/>
              {errors.weight&&<div style={{fontFamily:"'Barlow',sans-serif",fontSize:12,color:'#E8000D',marginTop:4}}>{errors.weight}</div>}
            </div>
            <div>
              <label style={LS}>Daily Steps</label>
              <select value={form.stepsPerDay} onChange={e=>set('stepsPerDay',e.target.value)} style={IS}>
                {[['2500','Under 3,000 (very sedentary)'],['5000','3,000–6,000 (desk job)'],['7500','6,000–9,000 (light activity)'],['10000','9,000–12,000 (moderately active)'],['13000','12,000–15,000 (very active)'],['17500','15,000+ (extremely active)']].map(([k,l])=><option key={k} value={k}>{l}</option>)}
              </select>
              <div style={{fontFamily:"'Barlow',sans-serif",fontSize:12,color:'#888888',marginTop:5,letterSpacing:0.5}}>Fine-tunes your TDEE beyond gym sessions</div>
            </div>
            <div>
              <label style={LS}>Workout Days Per Week</label>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {[0,1,2,3,4,5,6,7].map(d=>(
                  <button key={d} onClick={()=>set('workoutDays',String(d))} style={{width:42,height:42,fontFamily:"'Barlow',sans-serif",fontSize:14,fontWeight:600,cursor:'pointer',border:'1px solid #2a2a2a',background:form.workoutDays===String(d)?'#E8000D':'#0d0d0d',color:form.workoutDays===String(d)?'#080808':'#cccccc',fontWeight:form.workoutDays===String(d)?600:400}}>{d}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={LS}>Workout Duration</label>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {[['20','20m'],['30','30m'],['45','45m'],['60','60m'],['75','75m'],['90','90m'],['120','2hr']].map(([k,l])=>(
                  <button key={k} onClick={()=>set('workoutDuration',k)} style={{padding:'10px 14px',fontFamily:"'Barlow',sans-serif",fontSize:13,fontWeight:500,cursor:'pointer',border:'1px solid #2a2a2a',background:form.workoutDuration===k?'#E8000D':'#0d0d0d',color:form.workoutDuration===k?'#080808':'#cccccc'}}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={LS}>Workout Intensity</label>
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                {[['light','Light','Cardio, yoga, walking'],['moderate','Moderate','Standard weight training'],['hard','Hard','Heavy lifting, HIIT'],['very_hard','Very Hard','Competitive / 2-a-days']].map(([k,l,desc])=>(
                  <div key={k} onClick={()=>set('workoutIntensity',k)} style={{padding:'10px 14px',cursor:'pointer',background:form.workoutIntensity===k?'rgba(232,0,13,0.08)':'#0d0d0d',border:`1px solid ${form.workoutIntensity===k?'#E8000D':'#2a2a2a'}`,transition:'all 0.2s'}}>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:800,textTransform:'uppercase',color:form.workoutIntensity===k?'#E8000D':'#F5F5F5'}}>{l}</div>
                    <div style={{fontFamily:"'Barlow',sans-serif",fontSize:12,color:'#888888',letterSpacing:0.5,marginTop:3}}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label style={LS}>Base Activity <span style={{color:'#6a6a6a',fontSize:9}}>(outside workouts)</span></label>
              <select value={form.activity} onChange={e=>set('activity',e.target.value)} style={IS}>
                {[['sedentary','Sedentary (mostly sitting)'],['lightly','Lightly Active (some movement)'],['moderately','Moderately Active (on feet often)'],['very','Very Active (physical job)'],['extremely','Extremely Active (labor + training)']].map(([k,l])=><option key={k} value={k}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={LS}>Goal</label>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                {goals.map(g=>(
                  <div key={g.k} onClick={()=>set('goal',g.k)} style={{padding:'11px 12px',cursor:'pointer',background:form.goal===g.k?'rgba(232,0,13,0.08)':'#0d0d0d',border:`1px solid ${form.goal===g.k?'#E8000D':'#2a2a2a'}`,gridColumn:g.k==='maintain'?'span 2':'span 1'}}>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:800,textTransform:'uppercase',color:form.goal===g.k?'#E8000D':'#F5F5F5'}}>{g.l}</div>
                    <div style={{fontFamily:"'Barlow',sans-serif",fontSize:12,color:'#888888',letterSpacing:0.5,marginTop:3}}>{g.s}</div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={calculate} disabled={loading||limitReached} style={{width:'100%',padding:'16px',marginTop:8,background:limitReached?'#2a2a2a':'#E8000D',color:limitReached?'#6a6a6a':'#080808',fontFamily:"'Barlow',sans-serif",fontSize:14,fontWeight:700,letterSpacing:3,textTransform:'uppercase',border:'none',cursor:limitReached?'not-allowed':'pointer',clipPath:'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))'}}>
              {loading?'CALCULATING...':limitReached?'UPGRADE FOR MORE':'CALCULATE MY MACROS'}
            </button>
            {!isPro&&<div style={{fontFamily:"'Barlow',sans-serif",fontSize:13,color:'#888888',textAlign:'center',letterSpacing:0.5}}>{Math.max(0,2-getDailyCount())} free calculation{Math.max(0,2-getDailyCount())!==1?'s':''} remaining today</div>}
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          {!results?(
            <div style={{background:'#111111',border:'1px solid #1e1e1e',padding:32,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:400,gap:14}}>
              <div style={{fontSize:44,opacity:0.25}}>📊</div>
              <div style={{fontFamily:"'Barlow',sans-serif",fontSize:14,color:'#888888',textAlign:'center',letterSpacing:0.5,lineHeight:1.8}}>Enter your stats and hit<br/>Calculate to see your targets.</div>
            </div>
          ):(
            <>
              <div style={{background:'#111111',border:'1px solid #1e1e1e',padding:'28px 24px',textAlign:'center'}}>
                <div style={{fontFamily:"'Barlow',sans-serif",fontSize:13,fontWeight:500,letterSpacing:2,color:'#888888',textTransform:'uppercase',marginBottom:10}}>Daily Calories</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:80,fontWeight:900,color:'#E8000D',lineHeight:1,letterSpacing:-3,marginBottom:22}}>{results.calories.toLocaleString()}</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
                  {[['Protein',results.protein+'g','#E8000D'],['Carbs',results.carbs+'g','#F5F5F5'],['Fats',results.fats+'g','#aaaaaa']].map(([l,v,c])=>(
                    <div key={l} style={{background:'#0d0d0d',border:'1px solid #1e1e1e',padding:'12px 6px',textAlign:'center'}}>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:26,fontWeight:900,color:c,lineHeight:1}}>{v}</div>
                      <div style={{fontFamily:"'Barlow',sans-serif",fontSize:11,fontWeight:500,color:'#888888',letterSpacing:1.5,textTransform:'uppercase',marginTop:4}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{background:'#111111',border:'1px solid #1e1e1e',padding:'18px 22px'}}>
                <div style={{fontFamily:"'Barlow',sans-serif",fontSize:13,fontWeight:500,letterSpacing:2,color:'#888888',textTransform:'uppercase',marginBottom:10}}>Macro Ratio</div>
                <div style={{display:'flex',height:8,borderRadius:4,overflow:'hidden',gap:2}}>
                  {[[Math.round(results.protein*4/results.calories*100),'#E8000D'],[Math.round(results.carbs*4/results.calories*100),'#F5F5F5'],[Math.round(results.fats*9/results.calories*100),'#444']].map(([p,c],i)=>(
                    <div key={i} style={{flex:p,background:c,borderRadius:2}}/>
                  ))}
                </div>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:8}}>
                  {[['Protein',Math.round(results.protein*4/results.calories*100),'#E8000D'],['Carbs',Math.round(results.carbs*4/results.calories*100),'#F5F5F5'],['Fats',Math.round(results.fats*9/results.calories*100),'#aaaaaa']].map(([l,p,c])=>(
                    <div key={l} style={{fontFamily:"'Barlow',sans-serif",fontSize:12,fontWeight:500,color:c,letterSpacing:0.5}}>{p}% {l}</div>
                  ))}
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8}}>
                {[['BMR',results.bmr.toLocaleString()+' kcal','Base metabolic rate'],['TDEE',results.tdee.toLocaleString()+' kcal','Total daily energy'],['Workout Bonus','+'+results.dailyWorkoutBonus+' kcal','From your training'],['Water Target',results.waterOz+' oz','Adjusted for activity']].map(([l,v,sub])=>(
                  <div key={l} style={{background:'#111111',border:'1px solid #1e1e1e',padding:'14px 16px'}}>
                    <div style={{fontFamily:"'Barlow',sans-serif",fontSize:11,fontWeight:500,color:'#888888',letterSpacing:1,textTransform:'uppercase',marginBottom:4}}>{l}</div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:24,fontWeight:900,color:'#F5F5F5'}}>{v}</div>
                    <div style={{fontFamily:"'Barlow',sans-serif",fontSize:11,color:'#888888',letterSpacing:0.5,marginTop:3}}>{sub}</div>
                  </div>
                ))}
              </div>
              <div style={{background:'#111111',border:'1px solid #1e1e1e',padding:'14px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontFamily:"'Barlow',sans-serif",fontSize:11,fontWeight:500,color:'#888888',letterSpacing:1,textTransform:'uppercase',marginBottom:3}}>Daily Fiber</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:24,fontWeight:900,color:'#F5F5F5'}}>{results.fiber}</div>
                </div>
                <div style={{fontFamily:"'Barlow',sans-serif",fontSize:12,color:'#888888',letterSpacing:0.5,textAlign:'right',maxWidth:180,lineHeight:1.6}}>Supports digestion,<br/>satiety &amp; absorption</div>
              </div>
              <div style={{background:'#111111',border:'1px solid rgba(232,0,13,0.2)',padding:'18px 22px'}}>
                <div style={{fontFamily:"'Barlow',sans-serif",fontSize:13,fontWeight:600,letterSpacing:2,color:'#E8000D',textTransform:'uppercase',marginBottom:6}}>✓ Macros Ready</div>
                <div style={{fontFamily:"'Barlow',sans-serif",fontSize:13,color:'#888888',letterSpacing:0.5,lineHeight:1.8}}>Pro unlocks meal timing, training score, micronutrients &amp; AI physique rating →</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* =============================================
   TRAINING SCORE COMPONENT (PRO ONLY)
   ============================================= */

const MUSCLE_GROUPS = [
  { key:'chest', label:'Chest', category:'push' },
  { key:'shoulders', label:'Shoulders', category:'push' },
  { key:'triceps', label:'Triceps', category:'push' },
  { key:'back', label:'Back', category:'pull' },
  { key:'biceps', label:'Biceps', category:'pull' },
  { key:'rear_delts', label:'Rear Delts', category:'pull' },
  { key:'quads', label:'Quads', category:'legs' },
  { key:'hamstrings', label:'Hamstrings', category:'legs' },
  { key:'glutes', label:'Glutes', category:'legs' },
  { key:'calves', label:'Calves', category:'legs' },
  { key:'core', label:'Core', category:'push' },
]

const EXERCISE_PRESETS = {
  chest: ['Bench Press','Incline DB Press','Cable Fly','Dips','Push Ups','Pec Deck'],
  shoulders: ['OHP','Lateral Raise','DB Shoulder Press','Arnold Press','Face Pull','Front Raise'],
  triceps: ['Tricep Pushdown','Skull Crushers','Overhead Extension','Close Grip Bench','Dips'],
  back: ['Pull Ups','Barbell Row','Lat Pulldown','Cable Row','T-Bar Row','DB Row'],
  biceps: ['Barbell Curl','DB Curl','Hammer Curl','Preacher Curl','Cable Curl'],
  rear_delts: ['Face Pull','Reverse Fly','Rear Delt Cable','Band Pull Apart'],
  quads: ['Squat','Leg Press','Leg Extension','Lunge','Bulgarian Split Squat','Hack Squat'],
  hamstrings: ['RDL','Leg Curl','Nordic Curl','Good Morning','Stiff Leg DL'],
  glutes: ['Hip Thrust','Cable Kickback','Glute Bridge','Sumo Deadlift','Step Up'],
  calves: ['Standing Calf Raise','Seated Calf Raise','Leg Press Calf Raise'],
  core: ['Plank','Cable Crunch','Hanging Leg Raise','Ab Rollout','Pallof Press','Russian Twist'],
}

function TrainingScore({ addToast }) {
  const isMobile = useIsMobile()
  const [exercises, setExercises] = useState([])
  const [weeklySummary, setWeeklySummary] = useState({
    daysPerWeek: '4', avgDuration: '60', avgIntensity: 'moderate',
    restDays: '3', sleepHours: '7', deloadFrequency: 'monthly'
  })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(true)
  const [addingExercise, setAddingExercise] = useState(false)
  const [selectedMuscle, setSelectedMuscle] = useState('chest')
  const [newExercise, setNewExercise] = useState({ name:'', sets:'3', reps:'10', weight:'', muscleGroup:'chest' })

  // Load score history from Supabase
  useEffect(() => {
    const loadHistory = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) { setHistoryLoading(false); return }
      const { data, error } = await supabase
        .from('training_scores')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(10)
      if (!error && data) setHistory(data)
      setHistoryLoading(false)
    }
    loadHistory()
  }, [])

  const addExercise = () => {
    if (!newExercise.name) return
    setExercises(prev => [...prev, {
      ...newExercise,
      id: Date.now(),
      sets: parseInt(newExercise.sets) || 3,
      reps: parseInt(newExercise.reps) || 10,
      weight: parseFloat(newExercise.weight) || 0,
    }])
    setNewExercise({ name:'', sets:'3', reps:'10', weight:'', muscleGroup: selectedMuscle })
    addToast('Exercise added','success')
  }

  const removeExercise = (id) => {
    setExercises(prev => prev.filter(e => e.id !== id))
  }

  const setWS = (k, v) => setWeeklySummary(prev => ({ ...prev, [k]: v }))

  const calculateScore = async () => {
    if (exercises.length === 0) {
      addToast('Add at least one exercise first','error')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))

    // --- VOLUME SCORE (25 pts) ---
    // Count total weekly sets per muscle group
    const muscleSetMap = {}
    MUSCLE_GROUPS.forEach(mg => { muscleSetMap[mg.key] = 0 })
    exercises.forEach(ex => {
      const freq = parseInt(weeklySummary.daysPerWeek) || 1
      // If they listed exercises for one session, multiply by how many days they hit that muscle
      // Simplified: assume exercises listed = one full week of training
      muscleSetMap[ex.muscleGroup] = (muscleSetMap[ex.muscleGroup] || 0) + ex.sets
    })
    const totalSets = Object.values(muscleSetMap).reduce((a, b) => a + b, 0)
    const trainedMuscles = Object.entries(muscleSetMap).filter(([_, s]) => s > 0)
    // Optimal weekly sets per muscle: 10-20. Penalize under 6 or over 25
    let volumeScore = 0
    trainedMuscles.forEach(([muscle, sets]) => {
      if (sets >= 10 && sets <= 20) volumeScore += 25 / Math.max(trainedMuscles.length, 5)
      else if (sets >= 6 && sets < 10) volumeScore += (25 / Math.max(trainedMuscles.length, 5)) * 0.7
      else if (sets > 20 && sets <= 25) volumeScore += (25 / Math.max(trainedMuscles.length, 5)) * 0.8
      else if (sets > 0 && sets < 6) volumeScore += (25 / Math.max(trainedMuscles.length, 5)) * 0.4
      else if (sets > 25) volumeScore += (25 / Math.max(trainedMuscles.length, 5)) * 0.5
    })
    volumeScore = Math.min(25, Math.round(volumeScore))

    // --- FREQUENCY SCORE (20 pts) ---
    const daysPerWeek = parseInt(weeklySummary.daysPerWeek) || 0
    let frequencyScore = 0
    if (daysPerWeek >= 3 && daysPerWeek <= 6) frequencyScore = 20
    else if (daysPerWeek === 2) frequencyScore = 14
    else if (daysPerWeek === 7) frequencyScore = 15 // overtraining risk
    else if (daysPerWeek === 1) frequencyScore = 8
    else frequencyScore = 0
    // Bonus for hitting muscles >1 group (proxy: more exercises = more frequency)
    if (trainedMuscles.length >= 6) frequencyScore = Math.min(20, frequencyScore + 2)

    // --- BALANCE SCORE (20 pts) ---
    const pushSets = exercises.filter(e => ['chest','shoulders','triceps','core'].includes(e.muscleGroup)).reduce((a, e) => a + e.sets, 0)
    const pullSets = exercises.filter(e => ['back','biceps','rear_delts'].includes(e.muscleGroup)).reduce((a, e) => a + e.sets, 0)
    const legSets = exercises.filter(e => ['quads','hamstrings','glutes','calves'].includes(e.muscleGroup)).reduce((a, e) => a + e.sets, 0)
    const totalCategorySets = pushSets + pullSets + legSets
    let balanceScore = 0
    if (totalCategorySets > 0) {
      const pushPct = pushSets / totalCategorySets
      const pullPct = pullSets / totalCategorySets
      const legPct = legSets / totalCategorySets
      // Ideal ratio: ~33/33/33. Acceptable: 25-40% each
      const deviation = Math.abs(pushPct - 0.33) + Math.abs(pullPct - 0.33) + Math.abs(legPct - 0.33)
      if (deviation < 0.15) balanceScore = 20
      else if (deviation < 0.3) balanceScore = 16
      else if (deviation < 0.5) balanceScore = 12
      else if (deviation < 0.7) balanceScore = 8
      else balanceScore = 4
      // Penalize if any category is 0
      if (pushSets === 0 || pullSets === 0 || legSets === 0) balanceScore = Math.min(balanceScore, 8)
    }

    // --- INTENSITY SCORE (15 pts) ---
    const intensityMap = { light: 6, moderate: 12, hard: 14, very_hard: 15 }
    let intensityScore = intensityMap[weeklySummary.avgIntensity] || 10
    // Adjust for duration
    const dur = parseInt(weeklySummary.avgDuration) || 45
    if (dur < 30) intensityScore = Math.round(intensityScore * 0.7)
    else if (dur > 90) intensityScore = Math.round(intensityScore * 0.9) // diminishing returns

    // --- RECOVERY SCORE (20 pts) ---
    let recoveryScore = 0
    const restDays = parseInt(weeklySummary.restDays) || 0
    const sleepH = parseFloat(weeklySummary.sleepHours) || 6
    // Rest days: 2-3 optimal
    if (restDays >= 2 && restDays <= 3) recoveryScore += 8
    else if (restDays === 1 || restDays === 4) recoveryScore += 6
    else if (restDays === 0) recoveryScore += 2
    else recoveryScore += 4
    // Sleep: 7-9 optimal
    if (sleepH >= 7 && sleepH <= 9) recoveryScore += 8
    else if (sleepH >= 6 && sleepH < 7) recoveryScore += 5
    else if (sleepH > 9) recoveryScore += 6
    else recoveryScore += 3
    // Deload
    const deloadMap = { never: 0, quarterly: 2, monthly: 4, biweekly: 3 }
    recoveryScore += deloadMap[weeklySummary.deloadFrequency] || 0

    const totalScore = Math.min(100, volumeScore + frequencyScore + balanceScore + intensityScore + recoveryScore)

    const breakdown = {
      volume: { score: volumeScore, max: 25, totalSets, muscleSetMap },
      frequency: { score: frequencyScore, max: 20, daysPerWeek },
      balance: { score: balanceScore, max: 20, pushSets, pullSets, legSets },
      intensity: { score: intensityScore, max: 15 },
      recovery: { score: recoveryScore, max: 20, restDays, sleepH },
    }

    setResults({ score: totalScore, breakdown })

    // Save to Supabase
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      const { error } = await supabase.from('training_scores').insert({
        user_id: session.user.id,
        score: totalScore,
        breakdown,
        exercises: exercises.map(e => ({ name: e.name, muscleGroup: e.muscleGroup, sets: e.sets, reps: e.reps, weight: e.weight })),
        weekly_summary: weeklySummary,
      })
      if (error) {
        console.error('Save error:', error)
        addToast('Score calculated but failed to save','error')
      } else {
        // Refresh history
        const { data: hData } = await supabase
          .from('training_scores')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(10)
        if (hData) setHistory(hData)
        addToast('Training Score saved!','success')
      }
    }
    setLoading(false)
  }

  const getScoreLabel = (s) => {
    if (s >= 90) return 'ELITE'
    if (s >= 75) return 'ADVANCED'
    if (s >= 60) return 'SOLID'
    if (s >= 40) return 'DEVELOPING'
    return 'NEEDS WORK'
  }

  const getScoreColor = (s) => {
    if (s >= 75) return '#22c55e'
    if (s >= 50) return '#eab308'
    return '#E8000D'
  }

  const IS = { width:'100%', background:'#0d0d0d', border:'1px solid #2a2a2a', color:'#F5F5F5', fontFamily:"'Barlow',sans-serif", fontSize:16, padding:'13px 16px', outline:'none' }
  const LS = { fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:1, textTransform:'uppercase', color:'#cccccc', marginBottom:8, display:'block' }

  return (
    <div style={{ padding: isMobile ? '24px 16px' : '40px', maxWidth:1200, margin:'0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: isMobile ? 24 : 36 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:3, textTransform:'uppercase', color:'#E8000D', marginBottom:10 }}>
          <span style={{ width:20, height:1, background:'#E8000D', opacity:0.4 }}/>Training Score<span style={{ width:32, height:1, background:'#E8000D', opacity:0.4 }}/>
        </div>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize: isMobile ? 'clamp(32px,8vw,48px)' : 'clamp(36px,5vw,64px)', fontWeight:900, textTransform:'uppercase', lineHeight:0.9 }}>
          Rate Your<br/><span style={{ color:'#E8000D' }}>Program.</span>
        </h2>
      </div>

      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 20 }}>
        {/* LEFT COLUMN — Input */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {/* Exercise Log */}
          <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:isMobile?24:32 }}>
            <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:14, fontWeight:600, letterSpacing:3, textTransform:'uppercase', color:'#E8000D', marginBottom:24, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ flex:1, height:1, background:'#E8000D', opacity:0.3 }}/>Exercise Log<span style={{ flex:1, height:1, background:'#E8000D', opacity:0.3 }}/>
            </div>
            <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#888888', lineHeight:1.7, marginBottom:20, letterSpacing:0.3 }}>
              Add every exercise from your <strong style={{color:'#cccccc'}}>full training week</strong>. Include all sessions — the score evaluates your entire program.
            </p>

            {/* Muscle group selector */}
            <div style={{ marginBottom:16 }}>
              <label style={LS}>Muscle Group</label>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {MUSCLE_GROUPS.map(mg => (
                  <button key={mg.key} onClick={() => { setSelectedMuscle(mg.key); setNewExercise(prev => ({ ...prev, muscleGroup: mg.key, name:'' })) }}
                    style={{ padding:'8px 12px', fontFamily:"'Barlow',sans-serif", fontSize:12, fontWeight:500, cursor:'pointer',
                      border:`1px solid ${selectedMuscle === mg.key ? '#E8000D' : '#2a2a2a'}`,
                      background: selectedMuscle === mg.key ? 'rgba(232,0,13,0.08)' : '#0d0d0d',
                      color: selectedMuscle === mg.key ? '#E8000D' : '#888888',
                      transition:'all 0.2s' }}>
                    {mg.label}
                    {exercises.filter(e => e.muscleGroup === mg.key).length > 0 && (
                      <span style={{ marginLeft:5, fontSize:10, color:'#22c55e' }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick-pick presets */}
            <div style={{ marginBottom:16 }}>
              <label style={{ ...LS, fontSize:11, color:'#6a6a6a' }}>Quick Pick</label>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {(EXERCISE_PRESETS[selectedMuscle] || []).map(name => (
                  <button key={name} onClick={() => setNewExercise(prev => ({ ...prev, name, muscleGroup: selectedMuscle }))}
                    style={{ padding:'6px 12px', fontFamily:"'Barlow',sans-serif", fontSize:12, cursor:'pointer',
                      border:`1px solid ${newExercise.name === name ? '#E8000D' : '#2a2a2a'}`,
                      background: newExercise.name === name ? 'rgba(232,0,13,0.08)' : '#0d0d0d',
                      color: newExercise.name === name ? '#E8000D' : '#aaaaaa' }}>
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Or type custom */}
            <div style={{ marginBottom:14 }}>
              <label style={{ ...LS, fontSize:11, color:'#6a6a6a' }}>Or Type Custom</label>
              <input type="text" value={newExercise.name} onChange={e => setNewExercise(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g. Landmine Press"
                style={IS} onFocus={e => e.target.style.borderColor='#E8000D'} onBlur={e => e.target.style.borderColor='#2a2a2a'} />
            </div>

            {/* Sets / Reps / Weight row */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:14 }}>
              <div>
                <label style={{ ...LS, fontSize:11 }}>Sets</label>
                <input type="number" value={newExercise.sets} onChange={e => setNewExercise(prev => ({ ...prev, sets: e.target.value }))} style={IS} />
              </div>
              <div>
                <label style={{ ...LS, fontSize:11 }}>Reps</label>
                <input type="number" value={newExercise.reps} onChange={e => setNewExercise(prev => ({ ...prev, reps: e.target.value }))} style={IS} />
              </div>
              <div>
                <label style={{ ...LS, fontSize:11 }}>Weight (lbs)</label>
                <input type="number" value={newExercise.weight} onChange={e => setNewExercise(prev => ({ ...prev, weight: e.target.value }))} placeholder="135" style={IS} />
              </div>
            </div>

            <button onClick={addExercise} disabled={!newExercise.name}
              style={{ width:'100%', padding:'13px', background: newExercise.name ? '#E8000D' : '#2a2a2a', color: newExercise.name ? '#080808' : '#6a6a6a',
                fontFamily:"'Share Tech Mono',monospace", fontSize:11, letterSpacing:2, textTransform:'uppercase', border:'none', cursor: newExercise.name ? 'pointer' : 'not-allowed', fontWeight:600 }}>
              + Add Exercise
            </button>
          </div>

          {/* Exercise list */}
          {exercises.length > 0 && (
            <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:isMobile?20:24 }}>
              <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:12, fontWeight:600, letterSpacing:2, textTransform:'uppercase', color:'#888888', marginBottom:14 }}>
                Your Week — {exercises.length} exercise{exercises.length !== 1 ? 's' : ''} · {exercises.reduce((a, e) => a + e.sets, 0)} total sets
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {exercises.map(ex => {
                  const mg = MUSCLE_GROUPS.find(m => m.key === ex.muscleGroup)
                  return (
                    <div key={ex.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:'#0d0d0d', border:'1px solid #1e1e1e', gap:10 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:16, fontWeight:700, textTransform:'uppercase', color:'#F5F5F5' }}>{ex.name}</div>
                        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#6a6a6a', letterSpacing:1, marginTop:2 }}>
                          {mg?.label} · {ex.sets}×{ex.reps}{ex.weight > 0 ? ` @ ${ex.weight}lbs` : ''}
                        </div>
                      </div>
                      <button onClick={() => removeExercise(ex.id)} style={{ background:'none', border:'none', color:'#6a6a6a', fontSize:16, cursor:'pointer', padding:'4px 8px' }}
                        onMouseOver={e => e.target.style.color='#E8000D'} onMouseOut={e => e.target.style.color='#6a6a6a'}>✕</button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Weekly Summary */}
          <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:isMobile?24:32 }}>
            <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:14, fontWeight:600, letterSpacing:3, textTransform:'uppercase', color:'#E8000D', marginBottom:24, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ flex:1, height:1, background:'#E8000D', opacity:0.3 }}/>Weekly Overview<span style={{ flex:1, height:1, background:'#E8000D', opacity:0.3 }}/>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
              <div>
                <label style={LS}>Training Days Per Week</label>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {[1,2,3,4,5,6,7].map(d => (
                    <button key={d} onClick={() => { setWS('daysPerWeek', String(d)); setWS('restDays', String(7-d)) }}
                      style={{ width:42, height:42, fontFamily:"'Barlow',sans-serif", fontSize:14, fontWeight:600, cursor:'pointer', border:'1px solid #2a2a2a',
                        background: weeklySummary.daysPerWeek === String(d) ? '#E8000D' : '#0d0d0d',
                        color: weeklySummary.daysPerWeek === String(d) ? '#080808' : '#cccccc' }}>{d}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={LS}>Avg Session Duration</label>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {[['30','30m'],['45','45m'],['60','60m'],['75','75m'],['90','90m'],['120','2hr']].map(([k,l]) => (
                    <button key={k} onClick={() => setWS('avgDuration', k)}
                      style={{ padding:'10px 14px', fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, cursor:'pointer', border:'1px solid #2a2a2a',
                        background: weeklySummary.avgDuration === k ? '#E8000D' : '#0d0d0d',
                        color: weeklySummary.avgDuration === k ? '#080808' : '#cccccc' }}>{l}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={LS}>Average Intensity</label>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {[['light','Light','Mostly cardio, low effort'],['moderate','Moderate','Standard lifting, 2-3 RIR'],['hard','Hard','Heavy sets, 0-1 RIR, HIIT'],['very_hard','Very Hard','Max effort, failure sets']].map(([k,l,desc]) => (
                    <div key={k} onClick={() => setWS('avgIntensity', k)} style={{ padding:'10px 14px', cursor:'pointer', background: weeklySummary.avgIntensity === k ? 'rgba(232,0,13,0.08)' : '#0d0d0d', border:`1px solid ${weeklySummary.avgIntensity === k ? '#E8000D' : '#2a2a2a'}`, transition:'all 0.2s' }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:800, textTransform:'uppercase', color: weeklySummary.avgIntensity === k ? '#E8000D' : '#F5F5F5' }}>{l}</div>
                      <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:12, color:'#888888', letterSpacing:0.5, marginTop:3 }}>{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label style={LS}>Avg Sleep (hours/night)</label>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {['5','6','7','8','9','10'].map(h => (
                    <button key={h} onClick={() => setWS('sleepHours', h)}
                      style={{ width:48, height:42, fontFamily:"'Barlow',sans-serif", fontSize:14, fontWeight:600, cursor:'pointer', border:'1px solid #2a2a2a',
                        background: weeklySummary.sleepHours === h ? '#E8000D' : '#0d0d0d',
                        color: weeklySummary.sleepHours === h ? '#080808' : '#cccccc' }}>{h}h</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={LS}>Deload Frequency</label>
                <select value={weeklySummary.deloadFrequency} onChange={e => setWS('deloadFrequency', e.target.value)} style={IS}>
                  <option value="never">Never deload</option>
                  <option value="quarterly">Every 3 months</option>
                  <option value="monthly">Every 4-6 weeks</option>
                  <option value="biweekly">Every 2 weeks</option>
                </select>
                <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:12, color:'#888888', marginTop:5, letterSpacing:0.5 }}>
                  Planned deloads prevent overtraining and boost long-term gains
                </div>
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <button onClick={calculateScore} disabled={loading || exercises.length === 0}
            style={{ width:'100%', padding:'18px', background: exercises.length > 0 ? '#E8000D' : '#2a2a2a', color: exercises.length > 0 ? '#080808' : '#6a6a6a',
              fontFamily:"'Barlow',sans-serif", fontSize:14, fontWeight:700, letterSpacing:3, textTransform:'uppercase', border:'none',
              cursor: exercises.length > 0 ? 'pointer' : 'not-allowed',
              clipPath:'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))' }}>
            {loading ? 'ANALYZING PROGRAM...' : 'CALCULATE TRAINING SCORE'}
          </button>
        </div>

        {/* RIGHT COLUMN — Results */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {!results ? (
            <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:32, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:400, gap:14 }}>
              <div style={{ fontSize:44, opacity:0.25 }}>🏋️</div>
              <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:14, color:'#888888', textAlign:'center', letterSpacing:0.5, lineHeight:1.8 }}>
                Add your exercises and weekly<br/>overview, then hit Calculate.
              </div>
            </div>
          ) : (
            <>
              {/* Big Score Display */}
              <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:'32px 24px', textAlign:'center' }}>
                <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:2, color:'#888888', textTransform:'uppercase', marginBottom:8 }}>Training Score</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:100, fontWeight:900, color: getScoreColor(results.score), lineHeight:1, letterSpacing:-4 }}>
                  {results.score}
                </div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:12, letterSpacing:3, textTransform:'uppercase', color: getScoreColor(results.score), marginTop:4 }}>
                  {getScoreLabel(results.score)}
                </div>
                <div style={{ width:60, height:3, background: getScoreColor(results.score), margin:'14px auto 0', opacity:0.5 }} />
              </div>

              {/* Breakdown Bars */}
              <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:'24px' }}>
                <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:2, color:'#888888', textTransform:'uppercase', marginBottom:16 }}>Score Breakdown</div>
                {[
                  ['Volume', results.breakdown.volume.score, results.breakdown.volume.max, `${results.breakdown.volume.totalSets} total weekly sets`],
                  ['Frequency', results.breakdown.frequency.score, results.breakdown.frequency.max, `${results.breakdown.frequency.daysPerWeek} days/week`],
                  ['Balance', results.breakdown.balance.score, results.breakdown.balance.max, `Push ${results.breakdown.balance.pushSets} / Pull ${results.breakdown.balance.pullSets} / Legs ${results.breakdown.balance.legSets}`],
                  ['Intensity', results.breakdown.intensity.score, results.breakdown.intensity.max, weeklySummary.avgIntensity],
                  ['Recovery', results.breakdown.recovery.score, results.breakdown.recovery.max, `${results.breakdown.recovery.restDays} rest days · ${results.breakdown.recovery.sleepH}h sleep`],
                ].map(([label, score, max, detail]) => (
                  <div key={label} style={{ marginBottom:14 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                      <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:16, fontWeight:700, textTransform:'uppercase', color:'#F5F5F5' }}>{label}</span>
                      <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:12, color: score >= max * 0.75 ? '#22c55e' : score >= max * 0.5 ? '#eab308' : '#E8000D' }}>
                        {score}/{max}
                      </span>
                    </div>
                    <div style={{ height:6, background:'#1e1e1e', borderRadius:3, overflow:'hidden' }}>
                      <div style={{ width:`${(score / max) * 100}%`, height:'100%', background: score >= max * 0.75 ? '#22c55e' : score >= max * 0.5 ? '#eab308' : '#E8000D', borderRadius:3, transition:'width 0.6s ease' }} />
                    </div>
                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#6a6a6a', marginTop:4, letterSpacing:0.5 }}>{detail}</div>
                  </div>
                ))}
              </div>

              {/* Push/Pull/Legs Visual */}
              <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:'18px 22px' }}>
                <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:2, color:'#888888', textTransform:'uppercase', marginBottom:10 }}>Push / Pull / Legs Ratio</div>
                <div style={{ display:'flex', height:8, borderRadius:4, overflow:'hidden', gap:2 }}>
                  {(() => {
                    const total = results.breakdown.balance.pushSets + results.breakdown.balance.pullSets + results.breakdown.balance.legSets
                    if (total === 0) return <div style={{ flex:1, background:'#1e1e1e', borderRadius:2 }} />
                    return [
                      [results.breakdown.balance.pushSets, '#E8000D'],
                      [results.breakdown.balance.pullSets, '#F5F5F5'],
                      [results.breakdown.balance.legSets, '#444'],
                    ].map(([sets, color], i) => (
                      <div key={i} style={{ flex: Math.max(sets, 1), background: color, borderRadius:2 }} />
                    ))
                  })()}
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                  {[['Push', results.breakdown.balance.pushSets, '#E8000D'], ['Pull', results.breakdown.balance.pullSets, '#F5F5F5'], ['Legs', results.breakdown.balance.legSets, '#aaaaaa']].map(([l, s, c]) => (
                    <div key={l} style={{ fontFamily:"'Barlow',sans-serif", fontSize:12, fontWeight:500, color: c, letterSpacing:0.5 }}>{s} sets {l}</div>
                  ))}
                </div>
              </div>

              {/* Coaching Insights */}
              <div style={{ background:'#111111', border:'1px solid rgba(232,0,13,0.2)', padding:'18px 22px' }}>
                <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:600, letterSpacing:2, color:'#E8000D', textTransform:'uppercase', marginBottom:10 }}>⚡ Quick Fixes</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {(() => {
                    const fixes = []
                    const b = results.breakdown
                    if (b.volume.score < 18) fixes.push('Add more weekly sets — aim for 10-20 per muscle group for hypertrophy.')
                    if (b.balance.pushSets === 0) fixes.push('No push work detected. Add chest, shoulder, or tricep exercises.')
                    if (b.balance.pullSets === 0) fixes.push('No pull work detected. Add back, bicep, or rear delt exercises.')
                    if (b.balance.legSets === 0) fixes.push('No leg work detected. Don\'t skip legs — add squats, RDLs, or leg press.')
                    if (b.balance.score < 14) fixes.push('Your push/pull/legs ratio is off. Balance your program closer to equal thirds.')
                    if (b.recovery.sleepH < 7) fixes.push('Sleep under 7 hours tanks recovery. Aim for 7-9 hours.')
                    if (b.recovery.restDays < 2) fixes.push('You need more rest days. Muscles grow during recovery, not in the gym.')
                    if (b.frequency.daysPerWeek < 3) fixes.push('Training less than 3x/week limits progress. Try to add another day.')
                    if (b.frequency.daysPerWeek > 6) fixes.push('7 days/week risks overtraining. Schedule at least 1 full rest day.')
                    if (fixes.length === 0) fixes.push('Your program looks solid. Keep pushing and track your progress over time.')
                    return fixes.map((fix, i) => (
                      <div key={i} style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#aaaaaa', lineHeight:1.7, letterSpacing:0.3, paddingLeft:14, borderLeft:'2px solid #2a2a2a' }}>
                        {fix}
                      </div>
                    ))
                  })()}
                </div>
              </div>
            </>
          )}

          {/* Score History */}
          {history.length > 0 && (
            <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:'18px 22px' }}>
              <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:2, color:'#888888', textTransform:'uppercase', marginBottom:14 }}>Score History</div>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {history.map((h, i) => (
                  <div key={h.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 12px', background:'#0d0d0d', border:'1px solid #1e1e1e' }}>
                    <div>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:900, color: getScoreColor(h.score) }}>{h.score}</div>
                      <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:'#6a6a6a', letterSpacing:1 }}>{getScoreLabel(h.score)}</div>
                    </div>
                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#6a6a6a', letterSpacing:1 }}>
                      {new Date(h.created_at).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Landing({ onGetStarted, onJoinWaitlist }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' })
  const [wlEmail, setWlEmail] = useState('')
  const [wlCount, setWlCount] = useState(null)
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const fetchCount = async () => {
      const { count, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
      if (!error && count !== null) setWlCount(count)
      else setWlCount(0)
    }
    fetchCount()
  }, [])

  const handleJoinClick = () => {
    if(!wlEmail||!wlEmail.includes('@')) return
    onJoinWaitlist(wlEmail)
  }

  const faqs=[
    ['How is BUILT different from MyFitnessPal?',"MyFitnessPal tracks what you ate. BUILT by YELYK tells you what to eat, when to eat it, whether your training is optimized, and what your physique needs to improve. It's a complete intelligence system built by a real coach."],
    ['Who is YELYK?',"YELYK Fitness is a physique coaching brand built on You Earn Longevity You Keep. BUILT by YELYK is the software tool from the exact system used inside YELYK's coaching program — now accessible to everyone."],
    ['How does the AI Physique Rating work?',"Upload a front or back photo. AI analyzes your muscle development, symmetry, and proportion. Identifies your three strongest and three weakest muscle groups with specific training fixes. Your photo is immediately discarded."],
    ['What does the free tier give me?',"Two full macro calculations per day. Complete protein, carb, fat and calorie targets. Real, usable results. Training score, AI physique rating, and meal timing are Pro."],
    ['Can I cancel anytime?','Always. Cancel in under 30 seconds. No fees. You keep Pro through end of billing period then drop to free.'],
  ]

  const pad = isMobile ? '40px 20px' : '80px 40px'

  return (
    <div style={{paddingTop:isMobile?56:65}}>
      <section style={{minHeight:'100vh',display:'flex',alignItems:'center',padding:isMobile?'60px 20px':'80px 40px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(-52deg,transparent,transparent 80px,rgba(232,0,13,0.015) 80px,rgba(232,0,13,0.015) 81px)',pointerEvents:'none'}}/>
        {!isMobile&&<div style={{position:'absolute',right:'8%',top:'45%',transform:'translateY(-50%)',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(232,0,13,0.09) 0%,transparent 65%)',pointerEvents:'none'}}/>}
        {!isMobile&&<div style={{position:'absolute',right:-10,top:'50%',transform:'translateY(-50%)',fontFamily:"'Barlow Condensed',sans-serif",fontSize:'clamp(140px,18vw,260px)',fontWeight:900,textTransform:'uppercase',color:'transparent',WebkitTextStroke:'1px rgba(232,0,13,0.04)',pointerEvents:'none',lineHeight:1,whiteSpace:'nowrap',letterSpacing:-4}}>BUILT</div>}
        <div style={{position:'relative',zIndex:2,maxWidth:820}}>
          <div style={{display:'flex',alignItems:'center',gap:10,fontFamily:"'Share Tech Mono',monospace",fontSize:isMobile?9:10,letterSpacing:3,textTransform:'uppercase',color:'#E8000D',marginBottom:isMobile?16:22}}>
            <span style={{width:28,height:1,background:'#E8000D'}}/>Precision Nutrition &amp; Training Intelligence
          </div>
          <h1 style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:isMobile?'clamp(52px,14vw,80px)':'clamp(68px,11vw,148px)',fontWeight:900,lineHeight:0.86,letterSpacing:-1,textTransform:'uppercase'}}>
            <span style={{display:'block',color:'#F5F5F5'}}>GET</span>
            <span style={{display:'block',color:'#E8000D'}}>BUILT.</span>
            <span style={{display:'block',color:'transparent',WebkitTextStroke:isMobile?'1px rgba(245,245,245,0.18)':'1.5px rgba(245,245,245,0.18)'}}>BY</span>
            <img src="/yelyk-logo-only.png" alt="YELYK" style={{ height:isMobile?40:70, width:'auto', marginTop:4, opacity:0.18 }} />
          </h1>
          <div style={{display:'flex',alignItems:'center',gap:isMobile?10:14,margin:'22px 0 0'}}>
            <span style={{flex:1,maxWidth:44,height:1,background:'#2a2a2a'}}/>
            <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:isMobile?9:11,letterSpacing:isMobile?2:3,textTransform:'uppercase',color:'#aaaaaa',whiteSpace:'nowrap'}}>Built Different. Built by YELYK.</span>
            <span style={{flex:1,maxWidth:44,height:1,background:'#2a2a2a'}}/>
          </div>
          <p style={{fontSize:isMobile?14:17,color:'#aaaaaa',maxWidth:500,marginTop:isMobile?18:22,lineHeight:1.82,fontWeight:300}}>The precision macro calculator, training intelligence score, AI physique rating, and meal timing engine for athletes who are done guessing.</p>
          <div style={{display:'flex',alignItems:'center',gap:isMobile?10:14,marginTop:isMobile?28:40,flexWrap:'wrap'}}>
            <button onClick={onGetStarted} style={{background:'#E8000D',color:'#080808',fontFamily:"'Share Tech Mono',monospace",fontSize:isMobile?11:12,letterSpacing:2,textTransform:'uppercase',border:'none',padding:isMobile?'14px 28px':'16px 36px',cursor:'pointer',fontWeight:600,clipPath:'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))'}}>Start For Free →</button>
            <button onClick={()=>scrollTo('features')} style={{background:'transparent',color:'#aaaaaa',fontFamily:"'Share Tech Mono',monospace",fontSize:11,letterSpacing:2,textTransform:'uppercase',border:'1px solid #2a2a2a',padding:isMobile?'13px 22px':'15px 28px',cursor:'pointer'}}>See The Engines</button>
          </div>
          <div style={{display:'flex',gap:0,marginTop:isMobile?36:56,paddingTop:isMobile?20:28,borderTop:'1px solid #1e1e1e',flexWrap:'wrap'}}>
            {[['5','Engines'],['100','Pt Score'],['2','Free/Day'],['AI','Physique'],['5min','Setup']].map(([n,l],i)=>(
              <div key={l} style={{paddingRight:28,marginRight:28,borderRight:i<4?'1px solid #1e1e1e':'none',marginBottom:16}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:40,fontWeight:900,color:'#E8000D',lineHeight:1,letterSpacing:-2}}>{n}</div>
                <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,letterSpacing:2.5,color:'#6a6a6a',textTransform:'uppercase',marginTop:4}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:pad,borderTop:'1px solid #1e1e1e'}} id="features">
        <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:isMobile?'clamp(36px,10vw,56px)':'clamp(40px,6vw,80px)',fontWeight:900,textTransform:'uppercase',lineHeight:0.9,marginBottom:isMobile?32:48}}>Built Different.<br/>Built Precise.</h2>
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:1,background:'#1e1e1e',border:'1px solid #1e1e1e'}}>
          {[{n:'01',t:'Macro Engine',d:'Precise daily protein, carb, fat and calorie targets. Steps, workout intensity, and duration all factored in.'},{n:'02',t:'Training Score',d:'0–100 grade on your program with volume, frequency, balance, and recovery scored.'},{n:'03',t:'Meal Timing',d:'Every meal mapped to your schedule and training windows. Timed and portioned automatically.'},{n:'04',t:'AI Physique Rating',d:'Upload a photo. AI analyzes your physique and gives exact training fixes for weak points.'},{n:'05',t:'Progress Tracking',d:'Log weight and body fat. Visual charts show whether your plan is actually working.'}].map((f,i)=>(
            <div key={i} style={{background:'#111111',padding:'44px 34px',position:'relative',overflow:'hidden',transition:'background 0.3s'}}
              onMouseOver={e=>e.currentTarget.style.background='#141414'}
              onMouseOut={e=>e.currentTarget.style.background='#111111'}>
              <div style={{position:'absolute',top:12,right:16,fontFamily:"'Barlow Condensed',sans-serif",fontSize:88,fontWeight:900,color:'#1e1e1e',lineHeight:1,letterSpacing:-4}}>{f.n}</div>
              <div style={{display:'flex',flexDirection:'column',gap:3,marginBottom:20}}>
                {[36,25,15].map((w,j)=><div key={j} style={{width:w,height:4,borderRadius:1,background:'#E8000D',opacity:j===0?1:j===1?.6:.3}}/>)}
              </div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:800,textTransform:'uppercase',letterSpacing:1,marginBottom:10,color:'#F5F5F5'}}>{f.t}</div>
              <p style={{fontSize:13,color:'#aaaaaa',lineHeight:1.9,fontWeight:300}}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:pad,background:'#0d0d0d',borderTop:'1px solid #1e1e1e'}} id="pricing">
        <div style={{textAlign:'center',marginBottom:isMobile?32:44}}>
          <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:isMobile?'clamp(36px,10vw,56px)':'clamp(40px,6vw,80px)',fontWeight:900,textTransform:'uppercase',lineHeight:0.9,marginBottom:24}}>Start Free.<br/>Scale Up.</h2>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:14}}>
            <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:11,letterSpacing:2,textTransform:'uppercase',color:'#aaaaaa'}}>Monthly</span>
            <div onClick={()=>setAnnual(a=>!a)} style={{width:46,height:25,background:annual?'#E8000D':'#2a2a2a',borderRadius:13,position:'relative',cursor:'pointer',transition:'background 0.3s'}}>
              <div style={{position:'absolute',top:3,left:annual?24:3,width:17,height:17,borderRadius:'50%',background:'#F5F5F5',transition:'left 0.3s'}}/>
            </div>
            <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:11,letterSpacing:2,textTransform:'uppercase',color:'#aaaaaa'}}>Annual</span>
            <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'#22c55e',background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.25)',padding:'3px 10px'}}>Save 20%</span>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:1,background:'#1e1e1e',border:'1px solid #1e1e1e',maxWidth:720,margin:'0 auto'}}>
          <div style={{background:'#111111',padding:'36px 28px',display:'flex',flexDirection:'column'}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:30,fontWeight:900,textTransform:'uppercase',letterSpacing:2,marginBottom:4}}>Free</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:52,fontWeight:900,color:'#F5F5F5',lineHeight:1,marginBottom:4}}>$0</div>
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'#6a6a6a',letterSpacing:1,marginBottom:20}}>Forever free · No card needed</div>
            <div style={{flex:1,marginBottom:20}}>
              {[['✓','2 macro calculations/day',true],['✓','Full macro breakdown',true],['✓','Steps + intensity inputs',true],['✗','Training Score',false],['✗','AI Physique Rating',false],['✗','Meal Timing',false],['✗','Progress Tracking',false]].map(([icon,label,yes],i)=>(
                <div key={i} style={{display:'flex',gap:10,padding:'8px 0',borderBottom:'1px solid #1e1e1e',fontSize:13,color:yes?'#aaaaaa':'#6a6a6a'}}>
                  <span style={{color:yes?'#22c55e':'#2a2a2a',flexShrink:0}}>{icon}</span>{label}
                </div>
              ))}
            </div>
            <button onClick={onGetStarted} style={{width:'100%',padding:'13px',background:'transparent',color:'#aaaaaa',fontFamily:"'Share Tech Mono',monospace",fontSize:10,letterSpacing:2,textTransform:'uppercase',border:'1px solid #2a2a2a',cursor:'pointer'}}>Start Free</button>
          </div>
          <div style={{background:'#141414',padding:'36px 28px',display:'flex',flexDirection:'column',borderTop:'2px solid #E8000D',position:'relative',marginTop:-1}}>
            <div style={{position:'absolute',top:-1,left:'50%',transform:'translateX(-50%) translateY(-100%)',fontFamily:"'Share Tech Mono',monospace",fontSize:9,letterSpacing:2,textTransform:'uppercase',background:'#E8000D',color:'#080808',padding:'5px 14px',whiteSpace:'nowrap',fontWeight:600}}>Most Popular</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:30,fontWeight:900,textTransform:'uppercase',letterSpacing:2,marginBottom:4,color:'#E8000D'}}>Pro</div>
            <div style={{display:'flex',alignItems:'flex-start',gap:2,marginBottom:4}}>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:800,color:'#E8000D',marginTop:7}}>$</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:60,fontWeight:900,color:'#E8000D',lineHeight:1,letterSpacing:-2}}>{annual?'10.42':'12.99'}</span>
              <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#6a6a6a',marginTop:'auto',marginBottom:8}}>/mo</span>
            </div>
            {annual&&<div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'#22c55e',letterSpacing:1,marginBottom:4}}>Billed $124.99/year — save $30.89</div>}
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'#6a6a6a',letterSpacing:1,marginBottom:16}}>Cancel anytime</div>
            <div style={{flex:1,marginBottom:20}}>
              {[['✓','Unlimited calculations'],['✓','Training Score (0–100)'],['✓','AI Physique Rating'],['✓','Meal Timing Engine'],['✓','Progress Tracking'],['✓','Micronutrient breakdown']].map(([icon,label],i)=>(
                <div key={i} style={{display:'flex',gap:10,padding:'7px 0',borderBottom:'1px solid #1e1e1e',fontSize:13,color:icon==='✓'?'#aaaaaa':'#6a6a6a'}}>
                  <span style={{color:icon==='✓'?'#22c55e':'#6a6a6a',flexShrink:0}}>{icon}</span><strong style={{fontWeight:icon==='✓'?500:400}}>{label}</strong>
                </div>
              ))}
            </div>
            <button onClick={onGetStarted} style={{width:'100%',padding:'14px',background:'#E8000D',color:'#080808',fontFamily:"'Share Tech Mono',monospace",fontSize:11,letterSpacing:2,textTransform:'uppercase',border:'none',cursor:'pointer',fontWeight:600,clipPath:'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))'}}>Get Pro Access</button>
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'#6a6a6a',textAlign:'center',marginTop:10,lineHeight:1.6}}>Founding member price locked in forever</div>
          </div>
        </div>
      </section>

      <section style={{padding:pad}} id="faq">
        <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:isMobile?'clamp(32px,9vw,48px)':'clamp(40px,6vw,80px)',fontWeight:900,textTransform:'uppercase',lineHeight:0.9,textAlign:'center',marginBottom:isMobile?32:48}}>Got Questions.<br/>We've Got Answers.</h2>
        <div style={{maxWidth:760,margin:'0 auto',border:'1px solid #1e1e1e'}}>
          {faqs.map((faq,i)=>(
            <div key={i} style={{borderBottom:i<faqs.length-1?'1px solid #1e1e1e':'none'}}>
              <div onClick={()=>setOpenFaq(openFaq===i?null:i)}
                style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'18px 24px',cursor:'pointer',gap:14}}
                onMouseOver={e=>e.currentTarget.style.background='#111111'}
                onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                <div style={{fontSize:15,fontWeight:500,color:'#F5F5F5',lineHeight:1.4}}>{faq[0]}</div>
                <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:20,color:'#E8000D',flexShrink:0,transform:openFaq===i?'rotate(45deg)':'none',transition:'transform 0.3s',lineHeight:1}}>+</div>
              </div>
              <div style={{maxHeight:openFaq===i?300:0,overflow:'hidden',transition:'max-height 0.4s'}}>
                <div style={{padding:'0 24px 20px',fontSize:14,color:'#aaaaaa',lineHeight:1.9,fontWeight:300}}>{faq[1]}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:isMobile?'80px 20px':'120px 40px',textAlign:'center',position:'relative',overflow:'hidden',background:'#0d0d0d',borderTop:'1px solid #1e1e1e'}} id="waitlist">
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:700,height:700,borderRadius:'50%',background:'radial-gradient(circle,rgba(232,0,13,0.06) 0%,transparent 65%)',pointerEvents:'none'}}/>
        <div style={{position:'relative',zIndex:1}}>
          <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:'clamp(52px,9vw,112px)',fontWeight:900,textTransform:'uppercase',lineHeight:0.88,letterSpacing:-1,marginBottom:18}}>
            Be First.<br/><span style={{color:'#E8000D'}}>Get BUILT.</span>
          </h2>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,marginBottom:22}}>
            <span style={{width:36,height:1,background:'#2a2a2a'}}/>
            <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,letterSpacing:3,textTransform:'uppercase',color:'#aaaaaa'}}>Built Different. Built by YELYK.</span>
            <span style={{width:36,height:1,background:'#2a2a2a'}}/>
          </div>
          <p style={{color:'#aaaaaa',fontSize:16,maxWidth:460,margin:'0 auto 40px',fontWeight:300,lineHeight:1.82}}>Founding members get locked-in pricing forever and priority access to every feature.</p>
          <div style={{maxWidth:480,margin:'0 auto'}}>
              <div style={{display:'flex'}}>
                <input type="email" value={wlEmail} onChange={e=>setWlEmail(e.target.value)} placeholder="your@email.com"
                  onKeyDown={e=>e.key==='Enter'&&handleJoinClick()}
                  style={{flex:1,background:'#111111',border:'1px solid #2a2a2a',borderRight:'none',color:'#F5F5F5',fontFamily:"'Barlow',sans-serif",fontSize:15,padding:'15px 18px',outline:'none'}}/>
                <button onClick={handleJoinClick} style={{background:'#E8000D',color:'#080808',fontFamily:"'Share Tech Mono',monospace",fontSize:11,letterSpacing:2,textTransform:'uppercase',border:'none',padding:'15px 24px',cursor:'pointer',fontWeight:600,whiteSpace:'nowrap'}}>Join Now →</button>
              </div>
          </div>
          <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#6a6a6a',letterSpacing:2,marginTop:18}}>
            <strong style={{color:'#E8000D'}}>{wlCount !== null ? wlCount : '—'}</strong> athletes already on the list
          </div>
        </div>
      </section>
    </div>
  )
}

function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' })
  const isMobile = useIsMobile()
  return (
    <footer style={{background:'#0d0d0d',borderTop:'1px solid #1e1e1e',padding:isMobile?'36px 20px 20px':'48px 40px 28px'}}>
      <div style={{display:'flex',flexDirection:isMobile?'column':'row',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:isMobile?24:32,marginBottom:isMobile?28:40,paddingBottom:isMobile?28:40,borderBottom:'1px solid #1e1e1e'}}>
        <div>
          <Logo/>
          <p style={{fontSize:13,color:'#6a6a6a',lineHeight:1.85,fontWeight:300,marginTop:14,maxWidth:240}}>Precision nutrition and training intelligence built by YELYK Fitness.</p>
        </div>
        <div style={{display:'flex',gap:isMobile?32:48,flexWrap:'wrap'}}>
          {[['Product',[['Features',()=>scrollTo('features')],['Pricing',()=>scrollTo('pricing')],['FAQ',()=>scrollTo('faq')]]],['YELYK',[['YELYK Fitness',null],['Instagram',()=>window.open('https://instagram.com/yelykfitness','_blank')]]]].map(([title,links])=>(
            <div key={title}>
              <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,letterSpacing:3,textTransform:'uppercase',color:'#6a6a6a',marginBottom:16,display:'flex',alignItems:'center',gap:8}}>
                {title==='YELYK'&&<img src="/yelyk-logo-only.png" alt="YELYK" style={{height:14,width:'auto',opacity:0.5}}/>}
                {title}
              </div>
              {links.map(([l,a])=>(
                <div key={l} style={{marginBottom:10}}>
                  <button onClick={a} style={{fontSize:13,color:'#aaaaaa',background:'none',border:'none',cursor:'pointer',fontFamily:"'Barlow',sans-serif",padding:0}}
                    onMouseOver={e=>e.target.style.color='#E8000D'} onMouseOut={e=>e.target.style.color='#aaaaaa'}>{l}</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:14}}>
        <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,letterSpacing:2,color:'#6a6a6a',textTransform:'uppercase'}}>© 2026 BUILT by YELYK · YELYK Fitness. All rights reserved.</div>
        <div style={{display:'flex',gap:20}}>
          {['Privacy Policy','Terms'].map(l=><button key={l} style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,letterSpacing:1.5,color:'#6a6a6a',textTransform:'uppercase',background:'none',border:'none',cursor:'pointer'}}>{l}</button>)}
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isPro, setIsPro] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [authInitialTab, setAuthInitialTab] = useState('signin')
  const [authInitialEmail, setAuthInitialEmail] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [lastMacros, setLastMacros] = useState(null)
  const [sessionLoading, setSessionLoading] = useState(true)
  const [welcomeOpen, setWelcomeOpen] = useState(false)
  const { toasts, addToast } = useToast()
  const isMobile = useIsMobile()

  const openAuth = (tab = 'signin', email = '') => {
    setAuthInitialTab(tab)
    setAuthInitialEmail(email)
    setAuthOpen(true)
  }

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setIsLoggedIn(true)
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('plan')
          .eq('id', session.user.id)
          .single()
        if (profile?.plan === 'pro') setIsPro(true)
      }
      setSessionLoading(false)
      if (!session?.user) {
        const dismissed = sessionStorage.getItem('bby_welcome_dismissed')
        if (!dismissed) setWelcomeOpen(true)
      }
    }
    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setIsLoggedIn(true)
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('plan')
          .eq('id', session.user.id)
          .single()
        if (profile?.plan === 'pro') setIsPro(true)
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false)
        setIsPro(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try { await supabase.auth.signOut() } catch(e) { console.error('Sign out error:', e) }
    setIsLoggedIn(false)
    setIsPro(false)
    setActiveTab(0)
    localStorage.clear()
    sessionStorage.clear()
    addToast('Signed out','info')
  }

  const handleUpgrade = () => {
    window.open('https://builtbyyelyk.com/pricing','_blank')
    addToast('Opening pricing...','info')
  }

  const renderTab = () => {
    switch(activeTab) {
      case 0: return <MacroCalculator isPro={isPro} onUpgrade={handleUpgrade} addToast={addToast} onMacrosCalculated={setLastMacros}/>
      case 1: return isPro ? <TrainingScore addToast={addToast} /> : <Paywall feature="Training Score" onUpgrade={handleUpgrade}/>
      case 2: return isPro?<div style={{padding:40,color:'#aaaaaa',fontFamily:"'Share Tech Mono',monospace"}}>Meal Timing — Coming soon</div>:<Paywall feature="Meal Timing" onUpgrade={handleUpgrade}/>
      case 3: return isPro?<div style={{padding:40,color:'#aaaaaa',fontFamily:"'Share Tech Mono',monospace"}}>AI Physique Rating — Coming soon</div>:<Paywall feature="AI Physique Rating" onUpgrade={handleUpgrade}/>
      case 4: return isPro?<div style={{padding:40,color:'#aaaaaa',fontFamily:"'Share Tech Mono',monospace"}}>Progress Tracking — Coming soon</div>:<Paywall feature="Progress Tracking" onUpgrade={handleUpgrade}/>
      default: return null
    }
  }

  return (
    <div style={{background:'#080808',minHeight:'100vh'}}>
      <style>{`
        @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#080808;color:#F5F5F5}
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:#080808}
        ::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:3px}
      `}</style>

      <Navbar isLoggedIn={isLoggedIn} isPro={isPro} onSignIn={()=>openAuth('signin')} onSignOut={handleSignOut} activeTab={activeTab} setActiveTab={setActiveTab}/>

      {isLoggedIn ? (
        <>
          <div style={{background:'#111111',borderBottom:'1px solid #1e1e1e',display:'flex',overflowX:'auto',marginTop:isMobile?56:65,WebkitOverflowScrolling:'touch',scrollbarWidth:'none'}}>
            {['Macro Calc','Training Score','Meal Timing','AI Physique','Progress'].map((tab,i)=>(
              <button key={i} onClick={()=>setActiveTab(i)} style={{fontFamily:"'Barlow',sans-serif",fontSize:isMobile?12:14,fontWeight:500,letterSpacing:isMobile?'1px':'2px',textTransform:'uppercase',color:activeTab===i?'#F5F5F5':'#6a6a6a',background:'none',border:'none',borderBottom:activeTab===i?'2px solid #E8000D':'2px solid transparent',padding:isMobile?'14px 14px':'16px 24px',cursor:'pointer',whiteSpace:'nowrap',transition:'all 0.2s',flexShrink:0}}>
                {tab}{[1,2,3,4].includes(i)&&!isPro&&<span style={{marginLeft:5,fontSize:10,color:'#E8000D',fontWeight:600}}>PRO</span>}
              </button>
            ))}
          </div>
          <div style={{minHeight:'80vh'}}>{renderTab()}</div>
          <Footer/>
        </>
      ) : (
        <>
          <Landing onGetStarted={()=>openAuth('signup')} onJoinWaitlist={(email)=>openAuth('signup',email)}/>
          <Footer/>
        </>
      )}

      {welcomeOpen && !isLoggedIn && (
        <WelcomePopup
          onSignIn={()=>{setWelcomeOpen(false);sessionStorage.setItem('bby_welcome_dismissed','1');openAuth('signin')}}
          onSignUp={()=>{setWelcomeOpen(false);sessionStorage.setItem('bby_welcome_dismissed','1');openAuth('signup')}}
          onClose={()=>{setWelcomeOpen(false);sessionStorage.setItem('bby_welcome_dismissed','1')}}
        />
      )}

      <AuthModal isOpen={authOpen} onClose={()=>setAuthOpen(false)} onSuccess={()=>{setIsLoggedIn(true);setAuthOpen(false)}} addToast={addToast} initialTab={authInitialTab} initialEmail={authInitialEmail} onWaitlistJoined={()=>addToast('You\'re on the waitlist!','success')}/>
      <ToastContainer toasts={toasts}/>
    </div>
  )
}
