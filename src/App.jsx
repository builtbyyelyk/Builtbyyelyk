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
          <button onClick={onSignOut}  style={{ fontFamily:"'Barlow',sans-serif", fontSize:isMobile?11:13, fontWeight:500, letterSpacing:'1.5px', textTransform:'uppercase', color:'#aaaaaa', background:'none', border:'1px solid #2a2a2a', padding:isMobile?'8px 14px':'10px 20px', cursor:'pointer', WebkitTapHighlightColor:'transparent', touchAction:'manipulation' }}>Sign Out</button>
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
    // Save to Supabase
    const { data: { session } } = await supabase.auth.getSession()
    if(session?.user) {
     await supabase.from('macro_results').insert({
        user_id: session.user.id,
        calories: Math.round(calories),
        protein, carbs, fats,
        tdee: Math.round(tdee),
        bmr: Math.round(bmr),
        goal: form.goal
      })
    }
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

function TrainingScore({ addToast }) {
  const isMobile = useIsMobile()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    daysPerWeek: '4', avgDuration: '60', avgIntensity: 'moderate',
    muscleGroups: {},
    sleepHours: '7', deloadFrequency: 'monthly'
  })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])

  const MUSCLES = [
    { key:'chest', label:'Chest', cat:'push' },
    { key:'back', label:'Back', cat:'pull' },
    { key:'shoulders', label:'Shoulders', cat:'push' },
    { key:'arms', label:'Arms', cat:'push' },
    { key:'quads', label:'Quads', cat:'legs' },
    { key:'hamstrings_glutes', label:'Hamstrings / Glutes', cat:'legs' },
    { key:'core', label:'Core', cat:'push' },
  ]
  const SET_RANGES = [
    { key:'low', label:'1–6', desc:'Light volume', value:4 },
    { key:'mid', label:'7–12', desc:'Moderate', value:10 },
    { key:'high', label:'13–18', desc:'High volume', value:16 },
    { key:'very_high', label:'19+', desc:'Very high', value:22 },
  ]

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const toggleMuscle = (key) => {
    setForm(f => {
      const mg = { ...f.muscleGroups }
      if (mg[key]) { delete mg[key] } else { mg[key] = 'mid' }
      return { ...f, muscleGroups: mg }
    })
  }
  const setMuscleVolume = (key, vol) => {
    setForm(f => ({ ...f, muscleGroups: { ...f.muscleGroups, [key]: vol } }))
  }

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return
      const { data } = await supabase.from('training_scores')
        .select('*').eq('user_id', session.user.id)
        .order('created_at', { ascending: false }).limit(10)
      if (data) setHistory(data)
    }
    load()
  }, [])

  const restDays = 7 - (parseInt(form.daysPerWeek) || 0)
  const trainedMuscleCount = Object.keys(form.muscleGroups).length

  const calculateScore = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))

    const daysPerWeek = parseInt(form.daysPerWeek) || 0
    const dur = parseInt(form.avgDuration) || 45
    const sleepH = parseFloat(form.sleepHours) || 6

    const muscleSetMap = {}
    Object.entries(form.muscleGroups).forEach(([key, vol]) => {
      const range = SET_RANGES.find(r => r.key === vol)
      muscleSetMap[key] = range ? range.value : 10
    })
    const totalSets = Object.values(muscleSetMap).reduce((a, b) => a + b, 0)

    let volumeScore = 0
    const trained = Object.entries(muscleSetMap)
    trained.forEach(([_, sets]) => {
      if (sets >= 10 && sets <= 18) volumeScore += 25 / Math.max(trained.length, 5)
      else if (sets >= 6 && sets < 10) volumeScore += (25 / Math.max(trained.length, 5)) * 0.7
      else if (sets > 18 && sets <= 22) volumeScore += (25 / Math.max(trained.length, 5)) * 0.8
      else if (sets < 6) volumeScore += (25 / Math.max(trained.length, 5)) * 0.4
      else volumeScore += (25 / Math.max(trained.length, 5)) * 0.5
    })
    if (trained.length === 0) volumeScore = 0
    volumeScore = Math.min(25, Math.round(volumeScore))

    let frequencyScore = 0
    if (daysPerWeek >= 3 && daysPerWeek <= 5) frequencyScore = 20
    else if (daysPerWeek === 6) frequencyScore = 18
    else if (daysPerWeek === 2) frequencyScore = 14
    else if (daysPerWeek === 7) frequencyScore = 14
    else if (daysPerWeek === 1) frequencyScore = 8
    if (trained.length >= 5) frequencyScore = Math.min(20, frequencyScore + 2)

    const pushSets = Object.entries(muscleSetMap).filter(([k]) => MUSCLES.find(m => m.key === k)?.cat === 'push').reduce((a, [_, s]) => a + s, 0)
    const pullSets = Object.entries(muscleSetMap).filter(([k]) => MUSCLES.find(m => m.key === k)?.cat === 'pull').reduce((a, [_, s]) => a + s, 0)
    const legSets = Object.entries(muscleSetMap).filter(([k]) => MUSCLES.find(m => m.key === k)?.cat === 'legs').reduce((a, [_, s]) => a + s, 0)
    const totalCat = pushSets + pullSets + legSets
    let balanceScore = 0
    if (totalCat > 0) {
      const dev = Math.abs(pushSets/totalCat - 0.33) + Math.abs(pullSets/totalCat - 0.33) + Math.abs(legSets/totalCat - 0.33)
      if (dev < 0.15) balanceScore = 20
      else if (dev < 0.3) balanceScore = 16
      else if (dev < 0.5) balanceScore = 12
      else if (dev < 0.7) balanceScore = 8
      else balanceScore = 4
      if (pushSets === 0 || pullSets === 0 || legSets === 0) balanceScore = Math.min(balanceScore, 8)
    }

    const intMap = { light: 6, moderate: 12, hard: 14, very_hard: 15 }
    let intensityScore = intMap[form.avgIntensity] || 10
    if (dur < 30) intensityScore = Math.round(intensityScore * 0.7)
    else if (dur > 90) intensityScore = Math.round(intensityScore * 0.9)

    let recoveryScore = 0
    if (restDays >= 2 && restDays <= 3) recoveryScore += 8
    else if (restDays === 1 || restDays === 4) recoveryScore += 6
    else if (restDays === 0) recoveryScore += 2
    else recoveryScore += 4
    if (sleepH >= 7 && sleepH <= 9) recoveryScore += 8
    else if (sleepH >= 6 && sleepH < 7) recoveryScore += 5
    else if (sleepH > 9) recoveryScore += 6
    else recoveryScore += 3
    const deloadMap = { never: 0, sometimes: 2, regular: 4 }
    recoveryScore += deloadMap[form.deloadFrequency] || 0

    const totalScore = Math.min(100, volumeScore + frequencyScore + balanceScore + intensityScore + recoveryScore)
    const breakdown = {
      volume: { score: volumeScore, max: 25, totalSets },
      frequency: { score: frequencyScore, max: 20, daysPerWeek },
      balance: { score: balanceScore, max: 20, pushSets, pullSets, legSets },
      intensity: { score: intensityScore, max: 15 },
      recovery: { score: recoveryScore, max: 20, restDays, sleepH },
    }
    setResults({ score: totalScore, breakdown })

    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      const { error } = await supabase.from('training_scores').insert({
        user_id: session.user.id, score: totalScore, breakdown,
        exercises: form.muscleGroups, weekly_summary: form,
      })
      if (error) { addToast('Score calculated but failed to save','error') }
      else {
        const { data: hData } = await supabase.from('training_scores')
          .select('*').eq('user_id', session.user.id)
          .order('created_at', { ascending: false }).limit(10)
        if (hData) setHistory(hData)
        addToast('Training Score saved!','success')
      }
    }
    setLoading(false)
  }

  const getScoreLabel = (s) => s >= 90 ? 'ELITE' : s >= 75 ? 'ADVANCED' : s >= 60 ? 'SOLID' : s >= 40 ? 'DEVELOPING' : 'NEEDS WORK'
  const getScoreColor = (s) => s >= 75 ? '#22c55e' : s >= 50 ? '#eab308' : '#E8000D'

  const IS = { width:'100%', background:'#0d0d0d', border:'1px solid #2a2a2a', color:'#F5F5F5', fontFamily:"'Barlow',sans-serif", fontSize:16, padding:'13px 16px', outline:'none' }
  const LS = { fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:1, textTransform:'uppercase', color:'#cccccc', marginBottom:8, display:'block' }

  const StepDots = () => (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:28 }}>
      {[1,2,3].map(s => (
        <div key={s} onClick={() => { if (s < step || (s === 2 && form.daysPerWeek) || (s === 3 && trainedMuscleCount > 0)) setStep(s) }}
          style={{ width: step===s ? 28 : 10, height:10, borderRadius:5,
            background: s < step ? '#22c55e' : s === step ? '#E8000D' : '#2a2a2a',
            cursor: s <= step ? 'pointer' : 'default', transition:'all 0.3s' }} />
      ))}
    </div>
  )

  return (
    <div style={{ padding: isMobile ? '24px 16px' : '40px', maxWidth:700, margin:'0 auto' }}>
      <div style={{ marginBottom: isMobile ? 24 : 36 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:3, textTransform:'uppercase', color:'#E8000D', marginBottom:10 }}>
          <span style={{ width:20, height:1, background:'#E8000D', opacity:0.4 }}/>Training Score<span style={{ width:32, height:1, background:'#E8000D', opacity:0.4 }}/>
        </div>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize: isMobile ? 'clamp(32px,8vw,48px)' : 'clamp(36px,5vw,64px)', fontWeight:900, textTransform:'uppercase', lineHeight:0.9 }}>
          Rate Your<br/><span style={{ color:'#E8000D' }}>Program.</span>
        </h2>
      </div>

      {!results ? (
        <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding: isMobile ? 24 : 36 }}>
          <StepDots />

          {step === 1 && (
            <div style={{ display:'flex', flexDirection:'column', gap:22 }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:800, textTransform:'uppercase', color:'#F5F5F5', textAlign:'center' }}>
                Your Training Week
              </div>
              <div>
                <label style={LS}>Days Per Week</label>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {[1,2,3,4,5,6,7].map(d => (
                    <button key={d} onClick={() => set('daysPerWeek', String(d))}
                      style={{ flex:1, minWidth:40, height:46, fontFamily:"'Barlow',sans-serif", fontSize:16, fontWeight:700, cursor:'pointer', border:'1px solid #2a2a2a',
                        background: form.daysPerWeek === String(d) ? '#E8000D' : '#0d0d0d',
                        color: form.daysPerWeek === String(d) ? '#080808' : '#cccccc' }}>{d}</button>
                  ))}
                </div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:'#6a6a6a', marginTop:6, textAlign:'center' }}>
                  {restDays} rest day{restDays !== 1 ? 's' : ''} per week
                </div>
              </div>
              <div>
                <label style={LS}>Avg Session Length</label>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {[['30','30 min'],['45','45 min'],['60','60 min'],['75','75 min'],['90','90+ min']].map(([k,l]) => (
                    <button key={k} onClick={() => set('avgDuration', k)}
                      style={{ flex:1, padding:'12px 8px', fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:600, cursor:'pointer', border:'1px solid #2a2a2a',
                        background: form.avgDuration === k ? '#E8000D' : '#0d0d0d',
                        color: form.avgDuration === k ? '#080808' : '#cccccc', whiteSpace:'nowrap' }}>{l}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={LS}>Average Intensity</label>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {[['light','Light','Cardio, yoga, easy effort'],['moderate','Moderate','Standard lifting, 2-3 RIR'],['hard','Hard','Heavy compounds, 0-1 RIR'],['very_hard','Very Hard','Failure sets, max effort']].map(([k,l,desc]) => (
                    <div key={k} onClick={() => set('avgIntensity', k)}
                      style={{ padding:'12px 16px', cursor:'pointer', background: form.avgIntensity === k ? 'rgba(232,0,13,0.08)' : '#0d0d0d',
                        border:`1px solid ${form.avgIntensity === k ? '#E8000D' : '#2a2a2a'}`, transition:'all 0.2s' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:800, textTransform:'uppercase', color: form.avgIntensity === k ? '#E8000D' : '#F5F5F5' }}>{l}</div>
                        <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:12, color:'#6a6a6a' }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => setStep(2)}
                style={{ width:'100%', padding:'16px', background:'#E8000D', color:'#080808', fontFamily:"'Barlow',sans-serif", fontSize:14, fontWeight:700, letterSpacing:3, textTransform:'uppercase', border:'none', cursor:'pointer',
                  clipPath:'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))' }}>
                Next — Muscle Groups →
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display:'flex', flexDirection:'column', gap:22 }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:800, textTransform:'uppercase', color:'#F5F5F5', textAlign:'center' }}>
                What Do You Train?
              </div>
              <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#888888', textAlign:'center', lineHeight:1.7 }}>
                Tap to select each muscle group you hit per week, then pick your weekly set volume.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {MUSCLES.map(mg => {
                  const isActive = form.muscleGroups[mg.key] !== undefined
                  return (
                    <div key={mg.key} style={{ background: isActive ? 'rgba(232,0,13,0.06)' : '#0d0d0d', border:`1px solid ${isActive ? '#E8000D' : '#2a2a2a'}`, transition:'all 0.2s' }}>
                      <div onClick={() => toggleMuscle(mg.key)}
                        style={{ padding:'14px 16px', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:800, textTransform:'uppercase', color: isActive ? '#E8000D' : '#F5F5F5' }}>
                          {mg.label}
                        </div>
                        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color: isActive ? '#22c55e' : '#2a2a2a' }}>
                          {isActive ? '✓' : '—'}
                        </div>
                      </div>
                      {isActive && (
                        <div style={{ padding:'0 16px 14px', display:'flex', gap:6 }}>
                          {SET_RANGES.map(sr => (
                            <button key={sr.key} onClick={() => setMuscleVolume(mg.key, sr.key)}
                              style={{ flex:1, padding:'8px 4px', fontFamily:"'Barlow',sans-serif", fontSize:12, fontWeight:600, cursor:'pointer',
                                border:'1px solid #2a2a2a', textAlign:'center',
                                background: form.muscleGroups[mg.key] === sr.key ? '#E8000D' : '#111111',
                                color: form.muscleGroups[mg.key] === sr.key ? '#080808' : '#aaaaaa' }}>
                              <div>{sr.label}</div>
                              <div style={{ fontSize:9, fontWeight:400, color: form.muscleGroups[mg.key] === sr.key ? '#080808' : '#6a6a6a', marginTop:2 }}>{sr.desc}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              {trainedMuscleCount === 0 && (
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:'#E8000D', textAlign:'center' }}>Select at least one muscle group</div>
              )}
              <div style={{ display:'flex', gap:10 }}>
                <button onClick={() => setStep(1)}
                  style={{ flex:1, padding:'14px', background:'transparent', color:'#aaaaaa', fontFamily:"'Share Tech Mono',monospace", fontSize:11, letterSpacing:2, textTransform:'uppercase', border:'1px solid #2a2a2a', cursor:'pointer' }}>
                  ← Back
                </button>
                <button onClick={() => { if (trainedMuscleCount > 0) setStep(3) }}
                  style={{ flex:2, padding:'14px', background: trainedMuscleCount > 0 ? '#E8000D' : '#2a2a2a', color: trainedMuscleCount > 0 ? '#080808' : '#6a6a6a',
                    fontFamily:"'Barlow',sans-serif", fontSize:14, fontWeight:700, letterSpacing:3, textTransform:'uppercase', border:'none',
                    cursor: trainedMuscleCount > 0 ? 'pointer' : 'not-allowed',
                    clipPath:'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))' }}>
                  Next — Recovery →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display:'flex', flexDirection:'column', gap:22 }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:800, textTransform:'uppercase', color:'#F5F5F5', textAlign:'center' }}>
                Recovery
              </div>
              <div>
                <label style={LS}>Average Sleep (hours/night)</label>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {['5','6','7','8','9','10'].map(h => (
                    <button key={h} onClick={() => set('sleepHours', h)}
                      style={{ flex:1, height:46, fontFamily:"'Barlow',sans-serif", fontSize:15, fontWeight:700, cursor:'pointer', border:'1px solid #2a2a2a',
                        background: form.sleepHours === h ? '#E8000D' : '#0d0d0d',
                        color: form.sleepHours === h ? '#080808' : '#cccccc' }}>{h}h</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={LS}>Do You Deload?</label>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {[['never','Never','No planned deloads'],['sometimes','Sometimes','When I feel beat up'],['regular','Every 4–6 Weeks','Planned deload weeks']].map(([k,l,desc]) => (
                    <div key={k} onClick={() => set('deloadFrequency', k)}
                      style={{ padding:'12px 16px', cursor:'pointer', background: form.deloadFrequency === k ? 'rgba(232,0,13,0.08)' : '#0d0d0d',
                        border:`1px solid ${form.deloadFrequency === k ? '#E8000D' : '#2a2a2a'}`, transition:'all 0.2s' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:800, textTransform:'uppercase', color: form.deloadFrequency === k ? '#E8000D' : '#F5F5F5' }}>{l}</div>
                        <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:12, color:'#6a6a6a' }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background:'#0d0d0d', border:'1px solid #1e1e1e', padding:'14px 18px' }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#6a6a6a', letterSpacing:1, textTransform:'uppercase', marginBottom:6 }}>Summary</div>
                <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#aaaaaa', lineHeight:1.8 }}>
                  {form.daysPerWeek} days/week · {form.avgDuration} min sessions · {Object.keys(form.muscleGroups).length} muscle groups · {form.sleepHours}h sleep
                </div>
              </div>
              <div style={{ display:'flex', gap:10 }}>
                <button onClick={() => setStep(2)}
                  style={{ flex:1, padding:'14px', background:'transparent', color:'#aaaaaa', fontFamily:"'Share Tech Mono',monospace", fontSize:11, letterSpacing:2, textTransform:'uppercase', border:'1px solid #2a2a2a', cursor:'pointer' }}>
                  ← Back
                </button>
                <button onClick={calculateScore} disabled={loading}
                  style={{ flex:2, padding:'16px', background:'#E8000D', color:'#080808', fontFamily:"'Barlow',sans-serif", fontSize:14, fontWeight:700, letterSpacing:3, textTransform:'uppercase', border:'none', cursor:'pointer',
                    clipPath:'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))' }}>
                  {loading ? 'ANALYZING...' : 'GET MY SCORE'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:'36px 24px', textAlign:'center' }}>
            <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:2, color:'#888888', textTransform:'uppercase', marginBottom:8 }}>Training Score</div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:110, fontWeight:900, color: getScoreColor(results.score), lineHeight:1, letterSpacing:-4 }}>
              {results.score}
            </div>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:13, letterSpacing:3, textTransform:'uppercase', color: getScoreColor(results.score), marginTop:4 }}>
              {getScoreLabel(results.score)}
            </div>
            <div style={{ width:60, height:3, background: getScoreColor(results.score), margin:'14px auto 0', opacity:0.5 }} />
          </div>

          <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:24 }}>
            <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:2, color:'#888888', textTransform:'uppercase', marginBottom:16 }}>Breakdown</div>
            {[
              ['Volume', results.breakdown.volume.score, 25, `${results.breakdown.volume.totalSets} total weekly sets`],
              ['Frequency', results.breakdown.frequency.score, 20, `${results.breakdown.frequency.daysPerWeek} days/week`],
              ['Balance', results.breakdown.balance.score, 20, `Push ${results.breakdown.balance.pushSets} / Pull ${results.breakdown.balance.pullSets} / Legs ${results.breakdown.balance.legSets}`],
              ['Intensity', results.breakdown.intensity.score, 15, form.avgIntensity],
              ['Recovery', results.breakdown.recovery.score, 20, `${results.breakdown.recovery.restDays} rest days · ${results.breakdown.recovery.sleepH}h sleep`],
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

          <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:'18px 22px' }}>
            <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:2, color:'#888888', textTransform:'uppercase', marginBottom:10 }}>Push / Pull / Legs</div>
            <div style={{ display:'flex', height:8, borderRadius:4, overflow:'hidden', gap:2 }}>
              {(() => {
                const t = results.breakdown.balance.pushSets + results.breakdown.balance.pullSets + results.breakdown.balance.legSets
                if (t === 0) return <div style={{ flex:1, background:'#1e1e1e', borderRadius:2 }} />
                return [[results.breakdown.balance.pushSets,'#E8000D'],[results.breakdown.balance.pullSets,'#F5F5F5'],[results.breakdown.balance.legSets,'#444']].map(([s,c],i) => (
                  <div key={i} style={{ flex: Math.max(s, 1), background:c, borderRadius:2 }} />
                ))
              })()}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
              {[['Push', results.breakdown.balance.pushSets, '#E8000D'],['Pull', results.breakdown.balance.pullSets, '#F5F5F5'],['Legs', results.breakdown.balance.legSets, '#aaaaaa']].map(([l,s,c]) => (
                <div key={l} style={{ fontFamily:"'Barlow',sans-serif", fontSize:12, fontWeight:500, color:c }}>{s} sets {l}</div>
              ))}
            </div>
          </div>

          <div style={{ background:'#111111', border:'1px solid rgba(232,0,13,0.2)', padding:'18px 22px' }}>
            <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:600, letterSpacing:2, color:'#E8000D', textTransform:'uppercase', marginBottom:10 }}>⚡ Quick Fixes</div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {(() => {
                const fixes = []
                const b = results.breakdown
                if (b.volume.score < 18) fixes.push('Increase weekly volume — aim for 10-20 sets per muscle group.')
                if (b.balance.pushSets === 0) fixes.push('No push work. Add chest, shoulder, or tricep training.')
                if (b.balance.pullSets === 0) fixes.push('No pull work. Add back or bicep training.')
                if (b.balance.legSets === 0) fixes.push('Don\'t skip legs. Add squats, RDLs, or leg press.')
                if (b.balance.score < 14) fixes.push('Push/pull/legs ratio is off — aim for roughly equal thirds.')
                if (b.recovery.sleepH < 7) fixes.push('Sleep under 7 hours tanks recovery. Target 7-9 hours.')
                if (b.recovery.restDays < 2) fixes.push('More rest days needed. Muscles grow during recovery.')
                if (b.frequency.daysPerWeek < 3) fixes.push('Under 3 days/week limits progress. Try adding another day.')
                if (b.frequency.daysPerWeek > 6) fixes.push('7 days/week risks overtraining. Take at least 1 rest day.')
                if (fixes.length === 0) fixes.push('Your program looks solid. Stay consistent and track your progress.')
                return fixes.map((fix, i) => (
                  <div key={i} style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#aaaaaa', lineHeight:1.7, paddingLeft:14, borderLeft:'2px solid #2a2a2a' }}>
                    {fix}
                  </div>
                ))
              })()}
            </div>
          </div>

          {(() => {
            const days = parseInt(form.daysPerWeek) || 4
            const trained = Object.keys(form.muscleGroups)
            const missing = []
            const hasPush = trained.some(k => ['chest','shoulders','arms','core'].includes(k))
            const hasPull = trained.some(k => ['back'].includes(k))
            const hasLegs = trained.some(k => ['quads','hamstrings_glutes'].includes(k))
            if (!hasPush) missing.push('chest','shoulders')
            if (!hasPull) missing.push('back')
            if (!hasLegs) missing.push('quads','hamstrings_glutes')
            const allMuscles = [...trained, ...missing]

            const exerciseDB = {
              chest: [
                { name:'Bench Press', sets:4, reps:'6-8', note:'Primary compound — go heavy' },
                { name:'Incline DB Press', sets:3, reps:'8-10', note:'Upper chest focus' },
                { name:'Cable Fly', sets:3, reps:'12-15', note:'Squeeze at peak contraction' },
              ],
              back: [
                { name:'Barbell Row', sets:4, reps:'6-8', note:'Primary pull compound' },
                { name:'Lat Pulldown', sets:3, reps:'8-10', note:'Full stretch at top' },
                { name:'Cable Row', sets:3, reps:'10-12', note:'Squeeze shoulder blades' },
                { name:'Face Pull', sets:3, reps:'15-20', note:'Rear delt & posture health' },
              ],
              shoulders: [
                { name:'Overhead Press', sets:4, reps:'6-8', note:'Standing or seated — core tight' },
                { name:'Lateral Raise', sets:4, reps:'12-15', note:'Slow eccentrics, light weight' },
                { name:'Rear Delt Fly', sets:3, reps:'15-20', note:'Often neglected — don\'t skip' },
              ],
              arms: [
                { name:'Barbell Curl', sets:3, reps:'8-10', note:'Strict form, no swinging' },
                { name:'Tricep Pushdown', sets:3, reps:'10-12', note:'Lock out at bottom' },
                { name:'Hammer Curl', sets:3, reps:'10-12', note:'Brachialis & forearm' },
                { name:'Overhead Tricep Extension', sets:3, reps:'10-12', note:'Long head stretch' },
              ],
              quads: [
                { name:'Squat', sets:4, reps:'6-8', note:'King of leg exercises' },
                { name:'Leg Press', sets:3, reps:'10-12', note:'Feet high = more glute' },
                { name:'Leg Extension', sets:3, reps:'12-15', note:'Isolation finisher' },
                { name:'Bulgarian Split Squat', sets:3, reps:'8-10/leg', note:'Single-leg stability' },
              ],
              hamstrings_glutes: [
                { name:'Romanian Deadlift', sets:4, reps:'8-10', note:'Feel the hamstring stretch' },
                { name:'Hip Thrust', sets:3, reps:'10-12', note:'Peak squeeze at top' },
                { name:'Leg Curl', sets:3, reps:'12-15', note:'Slow negatives' },
                { name:'Glute Bridge', sets:3, reps:'12-15', note:'Pause at top 2 seconds' },
              ],
              core: [
                { name:'Cable Crunch', sets:3, reps:'12-15', note:'Weighted — progressive overload' },
                { name:'Hanging Leg Raise', sets:3, reps:'10-15', note:'Control the swing' },
                { name:'Pallof Press', sets:3, reps:'10/side', note:'Anti-rotation stability' },
              ],
            }

            const buildSplit = () => {
              if (days <= 2) {
                return [
                  { day:'Day 1', label:'Full Body A', muscles:['chest','back','quads','shoulders'] },
                  { day:'Day 2', label:'Full Body B', muscles:['back','hamstrings_glutes','arms','core'] },
                ].slice(0, days)
              } else if (days === 3) {
                return [
                  { day:'Day 1', label:'Push', muscles:['chest','shoulders','arms'] },
                  { day:'Day 2', label:'Pull', muscles:['back','arms'] },
                  { day:'Day 3', label:'Legs', muscles:['quads','hamstrings_glutes','core'] },
                ]
              } else if (days === 4) {
                return [
                  { day:'Day 1', label:'Upper', muscles:['chest','back','shoulders'] },
                  { day:'Day 2', label:'Lower', muscles:['quads','hamstrings_glutes','core'] },
                  { day:'Day 3', label:'Push', muscles:['chest','shoulders','arms'] },
                  { day:'Day 4', label:'Pull + Legs', muscles:['back','hamstrings_glutes','arms'] },
                ]
              } else if (days === 5) {
                return [
                  { day:'Day 1', label:'Chest & Triceps', muscles:['chest','arms'] },
                  { day:'Day 2', label:'Back & Biceps', muscles:['back','arms'] },
                  { day:'Day 3', label:'Legs', muscles:['quads','hamstrings_glutes'] },
                  { day:'Day 4', label:'Shoulders & Arms', muscles:['shoulders','arms'] },
                  { day:'Day 5', label:'Full Body / Weak Points', muscles:['core','hamstrings_glutes','back'] },
                ]
              } else {
                return [
                  { day:'Day 1', label:'Push', muscles:['chest','shoulders','arms'] },
                  { day:'Day 2', label:'Pull', muscles:['back','arms'] },
                  { day:'Day 3', label:'Legs', muscles:['quads','hamstrings_glutes'] },
                  { day:'Day 4', label:'Chest & Shoulders', muscles:['chest','shoulders'] },
                  { day:'Day 5', label:'Back & Arms', muscles:['back','arms'] },
                  { day:'Day 6', label:'Legs & Core', muscles:['hamstrings_glutes','quads','core'] },
                ].slice(0, days)
              }
            }

            const split = buildSplit()
            const getExercisesForDay = (muscles, isPrimary) => {
              const exs = []
              muscles.forEach(m => {
                const db = exerciseDB[m]
                if (!db) return
                const limit = m === 'arms' ? 2 : m === 'core' ? 2 : isPrimary ? 3 : 2
                exs.push(...db.slice(0, limit))
              })
              return exs
            }

            return (
              <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding: isMobile ? 20 : 24 }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:800, textTransform:'uppercase', color:'#E8000D', marginBottom:6 }}>
                  Recommended Program
                </div>
                <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#888888', lineHeight:1.7, marginBottom:20 }}>
                  Based on your {days}-day split. Adjust weights to match your level — focus on progressive overload each week.
                </div>

                {missing.length > 0 && (
                  <div style={{ background:'rgba(234,179,8,0.06)', border:'1px solid rgba(234,179,8,0.2)', padding:'10px 14px', marginBottom:16, fontFamily:"'Barlow',sans-serif", fontSize:12, color:'#eab308', lineHeight:1.7 }}>
                    ⚠ You're missing {missing.map(m => MUSCLES.find(mg => mg.key === m)?.label || m).join(', ')} — we've added them to your recommended split.
                  </div>
                )}

                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {split.map((s, si) => (
                    <div key={si} style={{ background:'#0d0d0d', border:'1px solid #1e1e1e' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 16px', borderBottom:'1px solid #1e1e1e' }}>
                        <div>
                          <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, letterSpacing:2, color:'#E8000D', textTransform:'uppercase' }}>{s.day}</span>
                          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:800, textTransform:'uppercase', color:'#F5F5F5', marginLeft:12 }}>{s.label}</span>
                        </div>
                        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#6a6a6a' }}>
                          {getExercisesForDay(s.muscles, true).length} exercises
                        </div>
                      </div>
                      <div style={{ padding:'8px 0' }}>
                        {getExercisesForDay(s.muscles, true).map((ex, ei) => (
                          <div key={ei} style={{ display:'flex', alignItems:'center', padding:'8px 16px', gap:12, borderBottom: ei < getExercisesForDay(s.muscles, true).length - 1 ? '1px solid #1a1a1a' : 'none' }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#2a2a2a', width:20, flexShrink:0 }}>{String(ei+1).padStart(2,'0')}</div>
                            <div style={{ flex:1 }}>
                              <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:14, fontWeight:600, color:'#F5F5F5' }}>{ex.name}</div>
                              <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:11, color:'#6a6a6a', marginTop:2 }}>{ex.note}</div>
                            </div>
                            <div style={{ textAlign:'right', flexShrink:0 }}>
                              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:16, fontWeight:800, color:'#E8000D' }}>{ex.sets}×{ex.reps}</div>
                              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:'#6a6a6a' }}>sets × reps</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop:16, padding:'14px 16px', background:'#0d0d0d', border:'1px solid #1e1e1e' }}>
                  <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:12, fontWeight:600, letterSpacing:2, color:'#888888', textTransform:'uppercase', marginBottom:10 }}>Training Tips</div>
                  {[
                    'Rest 2-3 min between heavy compounds, 60-90 sec between isolations.',
                    'Track your weights. Add 2.5-5 lbs when you hit the top of a rep range.',
                    'Warm up with 2-3 light sets before your first compound lift.',
                    form.deloadFrequency === 'never' ? 'Consider a deload week every 4-6 weeks — cut volume in half, keep intensity.' : null,
                    parseInt(form.sleepHours) < 7 ? 'Prioritize sleep — it\'s your #1 recovery tool. Aim for 7-9 hours.' : null,
                  ].filter(Boolean).map((tip, i) => (
                    <div key={i} style={{ fontFamily:"'Barlow',sans-serif", fontSize:12, color:'#6a6a6a', lineHeight:1.7, paddingLeft:12, borderLeft:'2px solid #1e1e1e', marginBottom:8 }}>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}

          <button onClick={() => { setResults(null); setStep(1) }}
            style={{ width:'100%', padding:'15px', background:'transparent', color:'#aaaaaa', fontFamily:"'Share Tech Mono',monospace", fontSize:11, letterSpacing:2, textTransform:'uppercase', border:'1px solid #2a2a2a', cursor:'pointer' }}>
            ← Score Another Program
          </button>

          {history.length > 0 && (
            <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:'18px 22px' }}>
              <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:2, color:'#888888', textTransform:'uppercase', marginBottom:14 }}>Score History</div>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {history.map(h => (
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
      )}
    </div>
  )
}

/* =============================================
   MEAL TIMING ENGINE COMPONENT (PRO ONLY)
   ============================================= */

const { error: macroError } = await supabase.from('macro_results').upsert({
        user_id: session.user.id,
        calories: Math.round(calories),
        protein, carbs, fats,
        tdee: Math.round(tdee),
        bmr: Math.round(bmr),
        goal: form.goal
      }, { onConflict: 'user_id' })
      if (macroError) {
        // Fallback: try delete then insert
        await supabase.from('macro_results').delete().eq('user_id', session.user.id)
        await supabase.from('macro_results').insert({
          user_id: session.user.id,
          calories: Math.round(calories),
          protein, carbs, fats,
          tdee: Math.round(tdee),
          bmr: Math.round(bmr),
          goal: form.goal
        })
      }  const isMobile = useIsMobile()
  const [macros, setMacros] = useState(null)
  const [macrosLoading, setMacrosLoading] = useState(true)
  const [form, setForm] = useState({
    wakeTime: '06:00',
    sleepTime: '22:00',
    trainingTime: '17:00',
    trainingDay: true,
    mealCount: '4',
  })
  const [schedule, setSchedule] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const toMins = (t) => {
    const [h, m] = t.split(':').map(Number)
    return h * 60 + m
  }
  const toLabel = (mins) => {
    const h = Math.floor(mins / 60) % 24
    const m = mins % 60
    const ampm = h >= 12 ? 'PM' : 'AM'
    const h12 = h % 12 === 0 ? 12 : h % 12
    return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
  }

  // Fetch macros from Supabase on mount
  useEffect(() => {
    const fetchMacros = async () => {
      setMacrosLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) { setMacrosLoading(false); return }
      const { data } = await supabase
        .from('macro_results')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
      if (data) setMacros(data)
      setMacrosLoading(false)
    }
    fetchMacros()
  }, [])

  // Split macros across meals based on goal and meal type
  const getMealMacros = (mealType, count, goal) => {
    if (!macros) return null
    const { calories, protein, carbs, fats } = macros

    // Calorie splits by meal type and goal
    const splits = {
      breakfast:   { aggressive_cut:0.25, moderate_cut:0.25, maintain:0.25, lean_bulk:0.20, bulk:0.20 },
      pre_workout: { aggressive_cut:0.20, moderate_cut:0.22, maintain:0.25, lean_bulk:0.28, bulk:0.30 },
      post_workout:{ aggressive_cut:0.25, moderate_cut:0.25, maintain:0.25, lean_bulk:0.30, bulk:0.30 },
      last_meal:   { aggressive_cut:0.20, moderate_cut:0.20, maintain:0.20, lean_bulk:0.18, bulk:0.18 },
      middle:      { aggressive_cut:0.10, moderate_cut:0.12, maintain:0.12, lean_bulk:0.12, bulk:0.12 },
    }

    const goalKey = goal || 'maintain'
    const calPct = splits[mealType]?.[goalKey] ?? (1 / count)
    const mealCals = Math.round(calories * calPct)

    // Protein split: higher at breakfast, post-workout, and last meal
    const proteinSplits = {
      breakfast:    0.30,
      pre_workout:  0.20,
      post_workout: 0.30,
      last_meal:    0.25,
      middle:       0.20,
    }
    const mealProtein = Math.round(protein * (proteinSplits[mealType] ?? (1/count)))

    // Carb split: high around training, lower at breakfast/last for cuts
    const carbSplits = {
      breakfast:    goalKey.includes('cut') ? 0.15 : 0.22,
      pre_workout:  0.30,
      post_workout: 0.30,
      last_meal:    goalKey.includes('cut') ? 0.10 : 0.18,
      middle:       0.20,
    }
    const mealCarbs = Math.round(carbs * (carbSplits[mealType] ?? (1/count)))

    // Fat split: higher at breakfast and last meal, low peri-workout
    const fatSplits = {
      breakfast:    0.28,
      pre_workout:  0.10,
      post_workout: 0.08,
      last_meal:    0.28,
      middle:       0.22,
    }
    const mealFats = Math.round(fats * (fatSplits[mealType] ?? (1/count)))

    return { calories: mealCals, protein: mealProtein, carbs: mealCarbs, fats: mealFats }
  }

  const buildSchedule = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))

    const wakeMins = toMins(form.wakeTime)
    const sleepMins = toMins(form.sleepTime)
    const trainMins = toMins(form.trainingTime)
    const count = parseInt(form.mealCount)
    const goal = macros?.goal || 'maintain'
    const isTrainingDay = form.trainingDay

    const wakingWindow = sleepMins > wakeMins ? sleepMins - wakeMins : (24 * 60 - wakeMins) + sleepMins

    // --- ANCHOR-BASED SCHEDULING ---
    // Rule 1: Breakfast always = wake + 30 min
    // Rule 2: Pre-workout = train - 75 min (if training day)
    // Rule 3: Post-workout = train + 45 min (if training day)
    // Rule 4: Last meal = sleep - 60 min
    // Rule 5: Fill remaining slots evenly in gaps

    const breakfastTime = wakeMins + 30
    const preWorkoutTime = trainMins - 75
    const postWorkoutTime = trainMins + 45
    const lastMealTime = sleepMins - 60

    // Build anchor slots
    let anchorSlots = []
    anchorSlots.push({ time: breakfastTime, type: 'breakfast' })
    if (isTrainingDay && count >= 3) {
      // Only add pre/post if they don't overlap with breakfast or last meal
      if (preWorkoutTime > breakfastTime + 90) {
        anchorSlots.push({ time: preWorkoutTime, type: 'pre_workout' })
      }
      if (postWorkoutTime < lastMealTime - 90) {
        anchorSlots.push({ time: postWorkoutTime, type: 'post_workout' })
      }
    }
    anchorSlots.push({ time: lastMealTime, type: 'last_meal' })

    // Remove duplicates and sort
    anchorSlots = anchorSlots
      .filter((s, i, arr) => arr.findIndex(x => Math.abs(x.time - s.time) < 60) === i)
      .sort((a, b) => a.time - b.time)
      .slice(0, count)

    // Fill remaining slots if count > anchors
    let slots = [...anchorSlots]
    if (slots.length < count) {
      const needed = count - slots.length
      // Find biggest gap and insert middle meals
      for (let n = 0; n < needed; n++) {
        let biggestGap = 0, insertAfter = 0
        for (let i = 0; i < slots.length - 1; i++) {
          const gap = slots[i+1].time - slots[i].time
          if (gap > biggestGap) { biggestGap = gap; insertAfter = i }
        }
        const midTime = Math.round((slots[insertAfter].time + slots[insertAfter+1].time) / 2)
        slots.splice(insertAfter + 1, 0, { time: midTime, type: 'middle' })
      }
    }

    // Ensure exactly `count` meals, sorted by time
    slots = slots.slice(0, count).sort((a, b) => a.time - b.time)

    // Build meal objects
    const goalData = {
      aggressive_cut: { label:'Aggressive Cut', strategy:'Keep meals evenly spaced to control hunger. Protein at every meal is non-negotiable.', carbTiming:'carbs around training only — minimal at other meals', fatTiming:'healthy fats at breakfast and last meal' },
      moderate_cut:   { label:'Moderate Cut', strategy:'Even meal spacing with carb focus around training. Keep fat moderate at every meal.', carbTiming:'moderate carbs all day, higher around training', fatTiming:'distribute fats evenly, reduce post-workout' },
      maintain:       { label:'Maintenance', strategy:'Balanced intake across the day. Use training window to maximise performance and recovery.', carbTiming:'carbs evenly spread with a bump around training', fatTiming:'healthy fats at all meals except directly post-workout' },
      lean_bulk:      { label:'Lean Bulk', strategy:'Prioritise peri-workout nutrition. More calories around training, controlled at other meals.', carbTiming:'higher carbs pre and post workout, moderate elsewhere', fatTiming:'fats at breakfast and dinner, low around training' },
      bulk:           { label:'Bulk', strategy:'Maximise caloric density around training. Don\'t skip meals — every window counts.', carbTiming:'high carbs all day, highest pre and post workout', fatTiming:'fats at all meals, increase at breakfast and dinner' },
    }
    const gd = goalData[goal] || goalData.maintain

    const mealDefs = {
      breakfast: {
        name: 'Breakfast',
        role: 'Kickstart metabolism. Break the overnight fast with protein and stable energy.',
        foods: goal.includes('cut')
          ? ['Eggs (3-4 whole)', 'Greek yogurt or cottage cheese', 'Oats (½ cup) or whole grain toast', 'Berries', 'Black coffee (optional)']
          : ['Eggs + egg whites', 'Oats (1 cup) with banana', 'Whole grain bread', 'Peanut butter', 'Milk or protein shake'],
        notes: goal.includes('cut')
          ? 'Avoid high-sugar options. Protein here reduces cravings all day.'
          : 'Big breakfast sets the caloric tone for the day. Don\'t skip it.',
        macroFocus: goal.includes('cut') ? 'High protein · Low-moderate carbs · Healthy fats' : 'High protein · High carbs · Moderate fats',
      },
      pre_workout: {
        name: 'Pre-Workout',
        role: 'Fuel performance. Carbs for energy, protein to prime muscle protein synthesis.',
        macroFocus: 'High carbs · Moderate protein · Low fat · Low fiber',
        foods: ['White rice or pasta (1-1.5 cups cooked)', 'Chicken breast or lean protein (4-6 oz)', 'Banana or rice cakes', 'Sports drink or water'],
        notes: 'Eat 60-90 min before training. Low fat and fiber = faster digestion = better performance.',
      },
      post_workout: {
        name: 'Post-Workout',
        role: 'Maximize recovery. Protein to rebuild muscle. Carbs to replenish glycogen.',
        macroFocus: 'High protein · High carbs · Very low fat',
        foods: ['Protein shake (30-40g protein)', 'White rice or potato (1-2 cups)', 'Banana or gummy candy (fast carbs)', 'Low fat Greek yogurt'],
        notes: 'Eat within 30-60 min after training. This is the most important meal on a training day.',
      },
      last_meal: {
        name: 'Last Meal',
        role: 'Sustain overnight recovery. Slow-digesting protein to prevent muscle breakdown during sleep.',
        macroFocus: goal === 'aggressive_cut' ? 'High protein · Low carbs · Low-moderate fats' : 'High protein · Moderate carbs · Moderate fats',
        foods: goal === 'aggressive_cut'
          ? ['Cottage cheese (1 cup)', 'Casein protein shake', 'Vegetables (unlimited)', 'Handful of almonds']
          : ['Cottage cheese or Greek yogurt', 'Salmon or lean beef', 'Sweet potato or rice', 'Leafy greens + olive oil dressing'],
        notes: 'Casein or cottage cheese digest slowly — ideal before sleep to prevent overnight catabolism.',
      },
      middle: {
        name: 'Lunch',
        role: 'Sustain energy and hit macro targets. Keep it consistent and easy to prep.',
        macroFocus: goal.includes('cut') ? 'High protein · Low carbs · Moderate fats' : goal.includes('bulk') ? 'High protein · High carbs · Moderate fats' : 'Balanced protein · Moderate carbs · Moderate fats',
        foods: goal.includes('cut')
          ? ['Grilled chicken, turkey, or tuna (6-8 oz)', 'Large salad or mixed vegetables', 'Avocado (¼-½)', 'Olive oil dressing']
          : goal.includes('bulk')
          ? ['Chicken, beef or salmon (6-8 oz)', 'Rice, pasta or potatoes (1.5-2 cups)', 'Mixed vegetables', 'Olive oil or cheese']
          : ['Lean protein (chicken, fish, turkey, 6 oz)', 'Brown rice or sweet potato (1 cup)', 'Vegetables (broccoli, peppers, spinach)', 'Olive oil or light dressing'],
        notes: goal.includes('cut') ? 'Keep carbs low at non-training meals. Volume from vegetables kills hunger.' : 'Consistency here is the highest-leverage habit in your nutrition.',
      },
    }

    const meals = slots.map((slot, idx) => {
      const def = mealDefs[slot.type] || mealDefs.middle
      const mealMacros = getMealMacros(slot.type, count, goal)
      // Name middle meals by index if there are multiple
      let name = def.name
      if (slot.type === 'middle') {
        const middleCount = slots.filter(s => s.type === 'middle').length
        if (middleCount > 1) name = `Meal ${idx + 1}`
      }
      return {
        index: idx + 1,
        time: slot.time,
        timeLabel: toLabel(slot.time),
        type: slot.type,
        name,
        role: def.role,
        macroFocus: def.macroFocus,
        foods: def.foods,
        notes: def.notes,
        mealMacros,
        isPreWorkout: slot.type === 'pre_workout',
        isPostWorkout: slot.type === 'post_workout',
        isFirst: idx === 0,
        isLast: idx === slots.length - 1,
      }
    })

    const periMsg = isTrainingDay
      ? `Training at ${toLabel(trainMins)} · Pre-workout meal at ${toLabel(preWorkoutTime)} · Post-workout at ${toLabel(postWorkoutTime)}`
      : 'Rest day: meals are spaced evenly. Slight calorie reduction is fine — keep protein identical to training days.'

    setSchedule({ meals, goal: gd.label, strategy: gd.strategy, carbTiming: gd.carbTiming, fatTiming: gd.fatTiming, periMsg, trainingTime: isTrainingDay ? toLabel(trainMins) : null })
    addToast('Meal schedule generated!', 'success')
    setLoading(false)
  }

  const IS = { width:'100%', background:'#0d0d0d', border:'1px solid #2a2a2a', color:'#F5F5F5', fontFamily:"'Barlow',sans-serif", fontSize:15, padding:'12px 14px', outline:'none' }
  const LS = { fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:1, textTransform:'uppercase', color:'#cccccc', marginBottom:8, display:'block' }

  const mealTagColor = (meal) => {
    if (meal.isPreWorkout) return '#eab308'
    if (meal.isPostWorkout) return '#22c55e'
    if (meal.isFirst) return '#E8000D'
    if (meal.isLast) return '#aaaaaa'
    return '#6a6a6a'
  }
  const mealTag = (meal) => {
    if (meal.isPreWorkout) return '⚡ PRE-WORKOUT'
    if (meal.isPostWorkout) return '✓ POST-WORKOUT'
    if (meal.isFirst) return '◈ FIRST MEAL'
    if (meal.isLast) return '◉ LAST MEAL'
    return `● MEAL ${meal.index}`
  }

  // Loading state
  if (macrosLoading) return (
    <div style={{ padding:40, textAlign:'center', color:'#6a6a6a', fontFamily:"'Share Tech Mono',monospace", fontSize:12 }}>
      Loading your data...
    </div>
  )

  // No macros — block and prompt
  if (!macros) return (
    <div style={{ padding: isMobile ? '24px 16px' : '40px', maxWidth:800, margin:'0 auto' }}>
      <div style={{ marginBottom:36 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:3, textTransform:'uppercase', color:'#E8000D', marginBottom:10 }}>
          <span style={{ width:20, height:1, background:'#E8000D', opacity:0.4 }}/>Meal Timing Engine<span style={{ width:32, height:1, background:'#E8000D', opacity:0.4 }}/>
        </div>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(36px,5vw,64px)', fontWeight:900, textTransform:'uppercase', lineHeight:0.9 }}>
          Eat At The<br/><span style={{ color:'#E8000D' }}>Right Time.</span>
        </h2>
      </div>
      <div style={{ background:'#111111', border:'1px solid #1e1e1e', borderTop:'2px solid #E8000D', padding:40, textAlign:'center' }}>
        <div style={{ fontSize:48, marginBottom:20 }}>📊</div>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:32, fontWeight:900, textTransform:'uppercase', color:'#F5F5F5', marginBottom:12 }}>
          Run The Macro Calculator First
        </div>
        <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:14, color:'#aaaaaa', lineHeight:1.8, maxWidth:380, margin:'0 auto 28px' }}>
          Meal Timing needs your calorie and macro targets to build a precise schedule. Calculate your macros first, then come back here.
        </div>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#6a6a6a', letterSpacing:1.5, lineHeight:1.8 }}>
          No macro data found for your account
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ padding: isMobile ? '24px 16px' : '40px', maxWidth: 800, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: isMobile ? 24 : 36 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:3, textTransform:'uppercase', color:'#E8000D', marginBottom:10 }}>
          <span style={{ width:20, height:1, background:'#E8000D', opacity:0.4 }}/>Meal Timing Engine<span style={{ width:32, height:1, background:'#E8000D', opacity:0.4 }}/>
        </div>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize: isMobile ? 'clamp(32px,8vw,48px)' : 'clamp(36px,5vw,64px)', fontWeight:900, textTransform:'uppercase', lineHeight:0.9 }}>
          Eat At The<br/><span style={{ color:'#E8000D' }}>Right Time.</span>
        </h2>
      </div>

      {/* Macro summary banner */}
      <div style={{ background:'rgba(232,0,13,0.06)', border:'1px solid rgba(232,0,13,0.2)', padding:'12px 20px', marginBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#E8000D', letterSpacing:1, textTransform:'uppercase' }}>
          Based on your macro targets
        </div>
        <div style={{ display:'flex', gap:20 }}>
          {[['Calories', macros.calories], ['Protein', macros.protein+'g'], ['Carbs', macros.carbs+'g'], ['Fats', macros.fats+'g']].map(([l, v]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:900, color:'#F5F5F5' }}>{v}</div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:'#6a6a6a', letterSpacing:1 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {!schedule ? (
        <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding: isMobile ? 24 : 36 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:22 }}>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div>
                <label style={LS}>Wake Time</label>
                <input type="time" value={form.wakeTime} onChange={e => set('wakeTime', e.target.value)} style={{ ...IS, colorScheme:'dark' }} />
              </div>
              <div>
                <label style={LS}>Sleep Time</label>
                <input type="time" value={form.sleepTime} onChange={e => set('sleepTime', e.target.value)} style={{ ...IS, colorScheme:'dark' }} />
              </div>
            </div>

            <div>
              <label style={LS}>Is This a Training Day?</label>
              <div style={{ display:'flex', gap:8, marginBottom: form.trainingDay ? 12 : 0 }}>
                {[['yes', true, 'Training Day'], ['no', false, 'Rest Day']].map(([k, val, label]) => (
                  <button key={k} onClick={() => set('trainingDay', val)}
                    style={{ flex:1, padding:'12px', fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:800, textTransform:'uppercase', cursor:'pointer',
                      border:`1px solid ${form.trainingDay === val ? '#E8000D' : '#2a2a2a'}`,
                      background: form.trainingDay === val ? 'rgba(232,0,13,0.08)' : '#0d0d0d',
                      color: form.trainingDay === val ? '#E8000D' : '#aaaaaa' }}>
                    {label}
                  </button>
                ))}
              </div>
              {form.trainingDay && (
                <div>
                  <label style={{ ...LS, marginTop:12 }}>Training Start Time</label>
                  <input type="time" value={form.trainingTime} onChange={e => set('trainingTime', e.target.value)} style={{ ...IS, colorScheme:'dark' }} />
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#6a6a6a', marginTop:6, letterSpacing:1 }}>
                    Pre-workout meal: ~75 min before · Post-workout: ~45 min after
                  </div>
                </div>
              )}
            </div>

            <div>
              <label style={LS}>Meals Per Day</label>
              <div style={{ display:'flex', gap:6 }}>
                {['3','4','5','6'].map(n => (
                  <button key={n} onClick={() => set('mealCount', n)}
                    style={{ flex:1, height:50, fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:900, cursor:'pointer',
                      border:'1px solid #2a2a2a',
                      background: form.mealCount === n ? '#E8000D' : '#0d0d0d',
                      color: form.mealCount === n ? '#080808' : '#cccccc' }}>{n}</button>
                ))}
              </div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#6a6a6a', marginTop:6, letterSpacing:1 }}>
                3–4 meals = easier to execute · 5–6 = more frequent protein doses
              </div>
            </div>

            <button onClick={buildSchedule} disabled={loading}
              style={{ width:'100%', padding:'17px', background:'#E8000D', color:'#080808', fontFamily:"'Barlow',sans-serif", fontSize:14, fontWeight:700, letterSpacing:3, textTransform:'uppercase', border:'none', cursor:'pointer',
                clipPath:'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))' }}>
              {loading ? 'BUILDING SCHEDULE...' : 'BUILD MY MEAL SCHEDULE →'}
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>

          <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:'24px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:10, marginBottom:14 }}>
              <div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, letterSpacing:2, color:'#E8000D', textTransform:'uppercase', marginBottom:4 }}>
                  {schedule.goal} · {form.mealCount} Meals/Day
                </div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:900, textTransform:'uppercase', color:'#F5F5F5', lineHeight:1 }}>
                  Your Timing Plan
                </div>
              </div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#6a6a6a', textAlign:'right', lineHeight:1.8 }}>
                Wake: {form.wakeTime}<br/>Sleep: {form.sleepTime}
                {schedule.trainingTime && <><br/>Train: {schedule.trainingTime}</>}
              </div>
            </div>
            <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#aaaaaa', lineHeight:1.8, paddingTop:14, borderTop:'1px solid #1e1e1e' }}>
              {schedule.strategy}
            </div>
          </div>

          <div style={{ background: form.trainingDay ? 'rgba(232,0,13,0.06)' : 'rgba(255,255,255,0.03)', border:`1px solid ${form.trainingDay ? 'rgba(232,0,13,0.2)' : '#1e1e1e'}`, padding:'12px 18px' }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color: form.trainingDay ? '#E8000D' : '#6a6a6a', letterSpacing:1, lineHeight:1.8 }}>
              {schedule.periMsg}
            </div>
          </div>

          <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:'16px 20px', display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:12 }}>
            <div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, letterSpacing:2, color:'#E8000D', textTransform:'uppercase', marginBottom:5 }}>Carb Strategy</div>
              <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#aaaaaa', lineHeight:1.7 }}>{schedule.carbTiming.charAt(0).toUpperCase() + schedule.carbTiming.slice(1)}.</div>
            </div>
            <div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, letterSpacing:2, color:'#888888', textTransform:'uppercase', marginBottom:5 }}>Fat Strategy</div>
              <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#aaaaaa', lineHeight:1.7 }}>{schedule.fatTiming.charAt(0).toUpperCase() + schedule.fatTiming.slice(1)}.</div>
            </div>
          </div>

          {/* Meal Cards */}
          {schedule.meals.map((meal, i) => (
            <div key={i} style={{ background:'#111111', border:'1px solid #1e1e1e', overflow:'hidden' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 20px', borderBottom:'1px solid #1e1e1e',
                background: meal.isPreWorkout ? 'rgba(234,179,8,0.05)' : meal.isPostWorkout ? 'rgba(34,197,94,0.05)' : 'transparent' }}>
                <div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, letterSpacing:2, color: mealTagColor(meal), textTransform:'uppercase', marginBottom:3 }}>
                    {mealTag(meal)}
                  </div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:900, textTransform:'uppercase', color:'#F5F5F5' }}>
                    {meal.name}
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:900, color: mealTagColor(meal), lineHeight:1 }}>
                    {meal.timeLabel}
                  </div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:'#6a6a6a', marginTop:2 }}>TARGET TIME</div>
                </div>
              </div>

              {/* Macro targets for this meal */}
              {meal.mealMacros && (
                <div style={{ padding:'12px 20px', background:'#0d0d0d', borderBottom:'1px solid #1e1e1e', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
                  {[['Calories', meal.mealMacros.calories, '#E8000D'], ['Protein', meal.mealMacros.protein+'g', '#E8000D'], ['Carbs', meal.mealMacros.carbs+'g', '#F5F5F5'], ['Fats', meal.mealMacros.fats+'g', '#aaaaaa']].map(([l, v, c]) => (
                    <div key={l} style={{ textAlign:'center' }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:20, fontWeight:900, color:c, lineHeight:1 }}>{v}</div>
                      <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:'#6a6a6a', letterSpacing:1, marginTop:3 }}>{l}</div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ padding:'12px 20px 0', fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#888888', lineHeight:1.7 }}>
                {meal.role}
              </div>

              <div style={{ padding:'10px 20px' }}>
                <div style={{ display:'inline-block', background:'rgba(232,0,13,0.08)', border:'1px solid rgba(232,0,13,0.15)', padding:'5px 12px',
                  fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#E8000D', letterSpacing:1 }}>
                  {meal.macroFocus}
                </div>
              </div>

              <div style={{ padding:'0 20px 14px', display:'flex', flexDirection:'column', gap:5 }}>
                {meal.foods.map((food, fi) => (
                  <div key={fi} style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:4, height:4, borderRadius:'50%', background:'#E8000D', flexShrink:0, opacity:0.6 }} />
                    <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#cccccc' }}>{food}</div>
                  </div>
                ))}
              </div>

              <div style={{ margin:'0 20px 16px', padding:'10px 14px', background:'#0d0d0d', border:'1px solid #1e1e1e', borderLeft:`2px solid ${mealTagColor(meal)}` }}>
                <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:12, color:'#888888', lineHeight:1.7 }}>
                  {meal.notes}
                </div>
              </div>
            </div>
          ))}

          {/* Day Timeline */}
          <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:'18px 20px' }}>
            <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:2, color:'#888888', textTransform:'uppercase', marginBottom:14 }}>
              Day Timeline
            </div>
            <div style={{ position:'relative' }}>
              <div style={{ position:'absolute', left:16, top:8, bottom:8, width:1, background:'#1e1e1e' }} />
              <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                {[
                  { label:'Wake', time: form.wakeTime, color:'#F5F5F5', dot:'#2a2a2a' },
                  ...schedule.meals.map(m => ({ label: m.name, time: m.timeLabel, color: mealTagColor(m), dot: mealTagColor(m) })),
                  ...(form.trainingDay ? [{ label:'Training', time: toLabel(toMins(form.trainingTime)), color:'#E8000D', dot:'#E8000D' }] : []),
                  { label:'Sleep', time: form.sleepTime, color:'#6a6a6a', dot:'#2a2a2a' }
                ].sort((a, b) => {
                  const getM = (t) => {
                    if (t.includes('AM') || t.includes('PM')) {
                      const [time, ampm] = t.split(' ')
                      const [h, m] = time.split(':').map(Number)
                      return (ampm === 'PM' && h !== 12 ? h + 12 : ampm === 'AM' && h === 12 ? 0 : h) * 60 + m
                    }
                    return toMins(t)
                  }
                  return getM(a.time) - getM(b.time)
                }).map((item, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:14, paddingLeft:4, paddingBottom:16 }}>
                    <div style={{ width:24, height:24, borderRadius:'50%', background: item.dot, border:`2px solid ${item.color}`, flexShrink:0, zIndex:1 }} />
                    <div style={{ display:'flex', justifyContent:'space-between', flex:1, alignItems:'center' }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:16, fontWeight:700, textTransform:'uppercase', color: item.color }}>{item.label}</div>
                      <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:'#6a6a6a' }}>{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button onClick={() => setSchedule(null)}
            style={{ width:'100%', padding:'15px', background:'transparent', color:'#aaaaaa', fontFamily:"'Share Tech Mono',monospace", fontSize:11, letterSpacing:2, textTransform:'uppercase', border:'1px solid #2a2a2a', cursor:'pointer' }}>
            ← Rebuild Schedule
          </button>
        </div>
      )}
    </div>
  )
}  const isMobile = useIsMobile()
  const [form, setForm] = useState({
    wakeTime: '06:00',
    sleepTime: '22:00',
    trainingTime: '17:00',
    trainingDay: true,
    mealCount: '4',
    goal: 'maintain'
  })
  const [schedule, setSchedule] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  // Convert "HH:MM" to minutes since midnight
  const toMins = (t) => {
    const [h, m] = t.split(':').map(Number)
    return h * 60 + m
  }

  // Convert minutes since midnight to 12h format
  const toLabel = (mins) => {
    const h = Math.floor(mins / 60) % 24
    const m = mins % 60
    const ampm = h >= 12 ? 'PM' : 'AM'
    const h12 = h % 12 === 0 ? 12 : h % 12
    return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
  }

  const buildSchedule = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))

    const wakeMins = toMins(form.wakeTime)
    const sleepMins = toMins(form.sleepTime)
    const trainMins = toMins(form.trainingTime)
    const count = parseInt(form.mealCount)
    const goal = form.goal
    const isTrainingDay = form.trainingDay

    // Waking window in minutes
    const wakingWindow = sleepMins > wakeMins ? sleepMins - wakeMins : (24 * 60 - wakeMins) + sleepMins

    // Meal timing data by goal
    const goalData = {
      aggressive_cut: {
        label: 'Aggressive Cut',
        strategy: 'Keep meals evenly spaced to control hunger. Protein at every meal is non-negotiable.',
        proteinSplit: [35, 30, 25, 10], // % of daily protein per meal slot (4-meal base)
        carbTiming: 'carbs around training only — minimal at other meals',
        fatTiming: 'healthy fats at breakfast and last meal'
      },
      moderate_cut: {
        label: 'Moderate Cut',
        strategy: 'Even meal spacing with carb focus around training. Keep fat moderate at every meal.',
        proteinSplit: [30, 25, 30, 15],
        carbTiming: 'moderate carbs all day, higher around training',
        fatTiming: 'distribute fats evenly, reduce post-workout'
      },
      maintain: {
        label: 'Maintenance',
        strategy: 'Balanced intake across the day. Use training window to maximise performance and recovery.',
        proteinSplit: [25, 25, 25, 25],
        carbTiming: 'carbs evenly spread with a bump around training',
        fatTiming: 'healthy fats at all meals except directly post-workout'
      },
      lean_bulk: {
        label: 'Lean Bulk',
        strategy: 'Prioritise peri-workout nutrition. More calories around training, controlled at other meals.',
        proteinSplit: [20, 30, 30, 20],
        carbTiming: 'higher carbs pre and post workout, moderate elsewhere',
        fatTiming: 'fats at breakfast and dinner, low around training'
      },
      bulk: {
        label: 'Bulk',
        strategy: 'Maximise caloric density around training. Don\'t skip meals — every window counts.',
        proteinSplit: [20, 25, 35, 20],
        carbTiming: 'high carbs all day, highest pre and post workout',
        fatTiming: 'fats at all meals, increase at breakfast and dinner'
      }
    }

    const gd = goalData[goal] || goalData.maintain

    // Build raw meal time slots
    // Spread meals across waking window with equal spacing
    const spacing = Math.floor(wakingWindow / (count + 1))
    const rawSlots = Array.from({ length: count }, (_, i) => wakeMins + spacing * (i + 1))

    // Define pre/post workout windows (if training day)
    const preWorkoutWindow = trainMins - 60  // 60 min pre
    const postWorkoutWindow = trainMins + 45 // 45 min post

    // Label each meal based on proximity to training and position in day
    const meals = rawSlots.map((slotMins, idx) => {
      const isFirst = idx === 0
      const isLast = idx === count - 1
      const isPreWorkout = isTrainingDay && Math.abs(slotMins - preWorkoutWindow) < 75
      const isPostWorkout = isTrainingDay && Math.abs(slotMins - postWorkoutWindow) < 75
      const isMidDay = !isFirst && !isLast && !isPreWorkout && !isPostWorkout

      // Determine meal name
      let name = ''
      let role = ''
      let macroFocus = ''
      let foods = []
      let notes = ''

      if (isFirst) {
        name = 'Breakfast'
        role = 'Kickstart metabolism. Break the overnight fast with protein and stable energy.'
        if (goal === 'aggressive_cut' || goal === 'moderate_cut') {
          macroFocus = 'High protein · Low-moderate carbs · Healthy fats'
          foods = ['Eggs (3-4 whole)', 'Greek yogurt or cottage cheese', 'Oats (½ cup) or whole grain toast', 'Berries', 'Black coffee (optional)']
          notes = 'Avoid high-sugar options. Protein here reduces cravings all day.'
        } else if (goal === 'lean_bulk' || goal === 'bulk') {
          macroFocus = 'High protein · High carbs · Moderate fats'
          foods = ['Eggs + egg whites', 'Oats (1 cup) with banana', 'Whole grain bread', 'Peanut butter', 'Milk or protein shake']
          notes = 'Big breakfast sets the caloric tone for the day. Don\'t skip it.'
        } else {
          macroFocus = 'High protein · Moderate carbs · Moderate fats'
          foods = ['3-4 eggs or Greek yogurt', 'Oats or whole grain toast', 'Fruit (banana or berries)', 'Coffee or green tea']
          notes = 'Front-load protein to hit targets earlier in the day.'
        }
      } else if (isPreWorkout && isTrainingDay) {
        name = 'Pre-Workout'
        role = 'Fuel performance. Carbs for energy, protein to prime muscle protein synthesis.'
        macroFocus = 'High carbs · Moderate protein · Low fat · Low fiber'
        foods = ['White rice or pasta (1-1.5 cups cooked)', 'Chicken breast or lean protein (4-6 oz)', 'Banana or rice cakes', 'Sports drink or water']
        notes = 'Eat 60-90 min before training. Low fat and fiber = faster digestion = better performance.'
      } else if (isPostWorkout && isTrainingDay) {
        name = 'Post-Workout'
        role = 'Maximize recovery. Protein to rebuild muscle. Carbs to replenish glycogen.'
        macroFocus = 'High protein · High carbs · Very low fat'
        foods = ['Protein shake (30-40g protein)', 'White rice or potato (1-2 cups)', 'Banana or gummy candy (fast carbs)', 'Low fat Greek yogurt']
        notes = 'Eat within 30-60 min after training. This is the most important meal on a training day.'
      } else if (isLast) {
        name = 'Last Meal'
        role = 'Sustain overnight recovery. Slow-digesting protein to prevent muscle breakdown during sleep.'
        if (goal === 'aggressive_cut') {
          macroFocus = 'High protein · Low carbs · Low-moderate fats'
          foods = ['Cottage cheese (1 cup)', 'Casein protein shake', 'Vegetables (unlimited)', 'Handful of almonds']
          notes = 'Casein or cottage cheese digest slowly — ideal before sleep to prevent overnight catabolism.'
        } else {
          macroFocus = 'High protein · Moderate carbs · Moderate fats'
          foods = ['Cottage cheese or Greek yogurt', 'Salmon or lean beef', 'Sweet potato or rice', 'Leafy greens + olive oil dressing']
          notes = 'Don\'t skip this meal. Overnight is the longest fasting window — protect your muscle with slow protein.'
        }
      } else {
        // Mid-day meal
        const midIdx = rawSlots.filter((_, i) => !([0, count-1].includes(i))).indexOf(slotMins) + 1
        name = count <= 3 ? 'Lunch' : `Meal ${idx + 1}`
        role = 'Sustain energy and hit macro targets. Keep it consistent and easy to prep.'
        if (goal === 'aggressive_cut') {
          macroFocus = 'High protein · Low carbs · Moderate fats'
          foods = ['Grilled chicken, turkey, or tuna (6-8 oz)', 'Large salad or mixed vegetables', 'Avocado (¼-½)', 'Olive oil dressing']
          notes = 'Keep carbs low at non-training meals. Volume from vegetables kills hunger.'
        } else if (goal === 'lean_bulk' || goal === 'bulk') {
          macroFocus = 'High protein · High carbs · Moderate fats'
          foods = ['Chicken, beef or salmon (6-8 oz)', 'Rice, pasta or potatoes (1.5-2 cups)', 'Mixed vegetables', 'Olive oil or cheese']
          notes = 'This meal fills caloric gaps. Don\'t under-eat here — it\'ll force excess calories at dinner.'
        } else {
          macroFocus = 'Balanced protein · Moderate carbs · Moderate fats'
          foods = ['Lean protein (chicken, fish, turkey, 6 oz)', 'Brown rice or sweet potato (1 cup)', 'Vegetables (broccoli, peppers, spinach)', 'Olive oil or light dressing']
          notes = 'Consistency here is the highest-leverage habit in your nutrition.'
        }
      }

      return {
        index: idx + 1,
        time: slotMins,
        timeLabel: toLabel(slotMins),
        name,
        role,
        macroFocus,
        foods,
        notes,
        isPreWorkout: isPreWorkout && isTrainingDay,
        isPostWorkout: isPostWorkout && isTrainingDay,
        isFirst,
        isLast
      }
    })

    // Peri-workout insight
    const perimsg = isTrainingDay
      ? `Training window: ${toLabel(preWorkoutWindow)} pre → ${toLabel(postWorkoutWindow)} post. Your schedule anchors meals to this window.`
      : 'Rest day: meals are spaced evenly. Slight calorie reduction is fine — keep protein identical to training days.'

    setSchedule({ meals, goal: gd.label, strategy: gd.strategy, carbTiming: gd.carbTiming, fatTiming: gd.fatTiming, periMsg: perimsg, trainingTime: isTrainingDay ? toLabel(trainMins) : null })
    addToast('Meal schedule generated!', 'success')
    setLoading(false)
  }

  const IS = { width:'100%', background:'#0d0d0d', border:'1px solid #2a2a2a', color:'#F5F5F5', fontFamily:"'Barlow',sans-serif", fontSize:15, padding:'12px 14px', outline:'none' }
  const LS = { fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:1, textTransform:'uppercase', color:'#cccccc', marginBottom:8, display:'block' }

  const mealTagColor = (meal) => {
    if (meal.isPreWorkout) return '#eab308'
    if (meal.isPostWorkout) return '#22c55e'
    if (meal.isFirst) return '#E8000D'
    if (meal.isLast) return '#aaaaaa'
    return '#6a6a6a'
  }
  const mealTag = (meal) => {
    if (meal.isPreWorkout) return '⚡ PRE-WORKOUT'
    if (meal.isPostWorkout) return '✓ POST-WORKOUT'
    if (meal.isFirst) return '◈ FIRST MEAL'
    if (meal.isLast) return '◉ LAST MEAL'
    return `● MEAL ${meal.index}`
  }

  return (
    <div style={{ padding: isMobile ? '24px 16px' : '40px', maxWidth: 800, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: isMobile ? 24 : 36 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:3, textTransform:'uppercase', color:'#E8000D', marginBottom:10 }}>
          <span style={{ width:20, height:1, background:'#E8000D', opacity:0.4 }}/>Meal Timing Engine<span style={{ width:32, height:1, background:'#E8000D', opacity:0.4 }}/>
        </div>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize: isMobile ? 'clamp(32px,8vw,48px)' : 'clamp(36px,5vw,64px)', fontWeight:900, textTransform:'uppercase', lineHeight:0.9 }}>
          Eat At The<br/><span style={{ color:'#E8000D' }}>Right Time.</span>
        </h2>
      </div>

      {!schedule ? (
        <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding: isMobile ? 24 : 36 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:22 }}>

            {/* Wake / Sleep */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div>
                <label style={LS}>Wake Time</label>
                <input type="time" value={form.wakeTime} onChange={e => set('wakeTime', e.target.value)}
                  style={{ ...IS, colorScheme:'dark' }} />
              </div>
              <div>
                <label style={LS}>Sleep Time</label>
                <input type="time" value={form.sleepTime} onChange={e => set('sleepTime', e.target.value)}
                  style={{ ...IS, colorScheme:'dark' }} />
              </div>
            </div>

            {/* Training Day toggle + time */}
            <div>
              <label style={LS}>Is This a Training Day?</label>
              <div style={{ display:'flex', gap:8, marginBottom: form.trainingDay ? 12 : 0 }}>
                {[['yes', true, 'Training Day'], ['no', false, 'Rest Day']].map(([k, val, label]) => (
                  <button key={k} onClick={() => set('trainingDay', val)}
                    style={{ flex:1, padding:'12px', fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:800, textTransform:'uppercase', cursor:'pointer',
                      border:`1px solid ${form.trainingDay === val ? '#E8000D' : '#2a2a2a'}`,
                      background: form.trainingDay === val ? 'rgba(232,0,13,0.08)' : '#0d0d0d',
                      color: form.trainingDay === val ? '#E8000D' : '#aaaaaa' }}>
                    {label}
                  </button>
                ))}
              </div>
              {form.trainingDay && (
                <div>
                  <label style={{ ...LS, marginTop: 12 }}>Training Start Time</label>
                  <input type="time" value={form.trainingTime} onChange={e => set('trainingTime', e.target.value)}
                    style={{ ...IS, colorScheme:'dark' }} />
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#6a6a6a', marginTop:6, letterSpacing:1 }}>
                    Pre-workout meal: ~60 min before · Post-workout: ~45 min after
                  </div>
                </div>
              )}
            </div>

            {/* Number of meals */}
            <div>
              <label style={LS}>Meals Per Day</label>
              <div style={{ display:'flex', gap:6 }}>
                {['3','4','5','6'].map(n => (
                  <button key={n} onClick={() => set('mealCount', n)}
                    style={{ flex:1, height:50, fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:900, cursor:'pointer',
                      border:'1px solid #2a2a2a',
                      background: form.mealCount === n ? '#E8000D' : '#0d0d0d',
                      color: form.mealCount === n ? '#080808' : '#cccccc' }}>{n}</button>
                ))}
              </div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#6a6a6a', marginTop:6, letterSpacing:1 }}>
                3–4 meals = easier to execute · 5–6 = more frequent protein doses
              </div>
            </div>

            {/* Goal */}
            <div>
              <label style={LS}>Goal</label>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                {[
                  ['aggressive_cut','Aggressive Cut','-500 cal deficit'],
                  ['moderate_cut','Moderate Cut','-250 cal deficit'],
                  ['maintain','Maintain','±0 cal'],
                  ['lean_bulk','Lean Bulk','+300 cal surplus'],
                  ['bulk','Bulk','+500 cal surplus'],
                ].map(([k, l, sub]) => (
                  <div key={k} onClick={() => set('goal', k)}
                    style={{ padding:'11px 12px', cursor:'pointer',
                      background: form.goal === k ? 'rgba(232,0,13,0.08)' : '#0d0d0d',
                      border:`1px solid ${form.goal === k ? '#E8000D' : '#2a2a2a'}`,
                      gridColumn: k === 'maintain' ? 'span 2' : 'span 1' }}>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:800, textTransform:'uppercase', color: form.goal === k ? '#E8000D' : '#F5F5F5' }}>{l}</div>
                    <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:12, color:'#888888', letterSpacing:0.5, marginTop:3 }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={buildSchedule} disabled={loading}
              style={{ width:'100%', padding:'17px', background:'#E8000D', color:'#080808', fontFamily:"'Barlow',sans-serif", fontSize:14, fontWeight:700, letterSpacing:3, textTransform:'uppercase', border:'none', cursor:'pointer',
                clipPath:'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))' }}>
              {loading ? 'BUILDING SCHEDULE...' : 'BUILD MY MEAL SCHEDULE →'}
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>

          {/* Strategy Header */}
          <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:'24px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:10, marginBottom:14 }}>
              <div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, letterSpacing:2, color:'#E8000D', textTransform:'uppercase', marginBottom:4 }}>
                  {schedule.goal} · {form.mealCount} Meals/Day
                </div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:900, textTransform:'uppercase', color:'#F5F5F5', lineHeight:1 }}>
                  Your Timing Plan
                </div>
              </div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#6a6a6a', textAlign:'right', lineHeight:1.8 }}>
                Wake: {form.wakeTime}<br/>Sleep: {form.sleepTime}
                {schedule.trainingTime && <><br/>Train: {schedule.trainingTime}</>}
              </div>
            </div>
            <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#aaaaaa', lineHeight:1.8, paddingTop:14, borderTop:'1px solid #1e1e1e' }}>
              {schedule.strategy}
            </div>
          </div>

          {/* Peri-workout note */}
          <div style={{ background: form.trainingDay ? 'rgba(232,0,13,0.06)' : 'rgba(255,255,255,0.03)', border:`1px solid ${form.trainingDay ? 'rgba(232,0,13,0.2)' : '#1e1e1e'}`, padding:'12px 18px' }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color: form.trainingDay ? '#E8000D' : '#6a6a6a', letterSpacing:1, lineHeight:1.8 }}>
              {schedule.periMsg}
            </div>
          </div>

          {/* Macro distribution notes */}
          <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:'16px 20px', display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:12 }}>
            <div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, letterSpacing:2, color:'#E8000D', textTransform:'uppercase', marginBottom:5 }}>Carb Strategy</div>
              <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#aaaaaa', lineHeight:1.7 }}>{schedule.carbTiming.charAt(0).toUpperCase() + schedule.carbTiming.slice(1)}.</div>
            </div>
            <div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, letterSpacing:2, color:'#888888', textTransform:'uppercase', marginBottom:5 }}>Fat Strategy</div>
              <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#aaaaaa', lineHeight:1.7 }}>{schedule.fatTiming.charAt(0).toUpperCase() + schedule.fatTiming.slice(1)}.</div>
            </div>
          </div>

          {/* Meal Cards */}
          {schedule.meals.map((meal, i) => (
            <div key={i} style={{ background:'#111111', border:'1px solid #1e1e1e', overflow:'hidden' }}>
              {/* Meal header */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 20px', borderBottom:'1px solid #1e1e1e',
                background: meal.isPreWorkout ? 'rgba(234,179,8,0.05)' : meal.isPostWorkout ? 'rgba(34,197,94,0.05)' : 'transparent' }}>
                <div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, letterSpacing:2, color: mealTagColor(meal), textTransform:'uppercase', marginBottom:3 }}>
                    {mealTag(meal)}
                  </div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:900, textTransform:'uppercase', color:'#F5F5F5' }}>
                    {meal.name}
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:900, color: mealTagColor(meal), lineHeight:1 }}>
                    {meal.timeLabel}
                  </div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:'#6a6a6a', marginTop:2 }}>TARGET TIME</div>
                </div>
              </div>

              {/* Role */}
              <div style={{ padding:'12px 20px 0', fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#888888', lineHeight:1.7 }}>
                {meal.role}
              </div>

              {/* Macro focus badge */}
              <div style={{ padding:'10px 20px' }}>
                <div style={{ display:'inline-block', background:'rgba(232,0,13,0.08)', border:'1px solid rgba(232,0,13,0.15)', padding:'5px 12px',
                  fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:'#E8000D', letterSpacing:1 }}>
                  {meal.macroFocus}
                </div>
              </div>

              {/* Food list */}
              <div style={{ padding:'0 20px 14px', display:'flex', flexDirection:'column', gap:5 }}>
                {meal.foods.map((food, fi) => (
                  <div key={fi} style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:4, height:4, borderRadius:'50%', background:'#E8000D', flexShrink:0, opacity:0.6 }} />
                    <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#cccccc' }}>{food}</div>
                  </div>
                ))}
              </div>

              {/* Coaching note */}
              <div style={{ margin:'0 20px 16px', padding:'10px 14px', background:'#0d0d0d', border:'1px solid #1e1e1e', borderLeft:`2px solid ${mealTagColor(meal)}` }}>
                <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:12, color:'#888888', lineHeight:1.7 }}>
                  {meal.notes}
                </div>
              </div>
            </div>
          ))}

          {/* Daily summary timeline */}
          <div style={{ background:'#111111', border:'1px solid #1e1e1e', padding:'18px 20px' }}>
            <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:500, letterSpacing:2, color:'#888888', textTransform:'uppercase', marginBottom:14 }}>
              Day Timeline
            </div>
            <div style={{ position:'relative' }}>
              {/* Line */}
              <div style={{ position:'absolute', left:16, top:8, bottom:8, width:1, background:'#1e1e1e' }} />
              <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                {[
                  { label: 'Wake', time: form.wakeTime, color: '#F5F5F5', dot: '#2a2a2a' },
                  ...schedule.meals.map(m => ({ label: m.name, time: m.timeLabel, color: mealTagColor(m), dot: mealTagColor(m) })),
                  ...(form.trainingDay ? [{ label: 'Training', time: toLabel(toMins(form.trainingTime)), color: '#E8000D', dot: '#E8000D' }] : []),
                  { label: 'Sleep', time: form.sleepTime, color: '#6a6a6a', dot: '#2a2a2a' }
                ]
                .sort((a, b) => {
                  const getM = (t) => {
                    if (t.includes(':') && (t.includes('AM') || t.includes('PM'))) {
                      const [time, ampm] = t.split(' ')
                      const [h, m] = time.split(':').map(Number)
                      return (ampm === 'PM' && h !== 12 ? h + 12 : ampm === 'AM' && h === 12 ? 0 : h) * 60 + m
                    }
                    return toMins(t)
                  }
                  return getM(a.time) - getM(b.time)
                })
                .map((item, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:14, paddingLeft:4, paddingBottom:16 }}>
                    <div style={{ width:24, height:24, borderRadius:'50%', background: item.dot, border:`2px solid ${item.color}`, flexShrink:0, zIndex:1 }} />
                    <div style={{ display:'flex', justifyContent:'space-between', flex:1, alignItems:'center' }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:16, fontWeight:700, textTransform:'uppercase', color: item.color }}>{item.label}</div>
                      <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:'#6a6a6a' }}>{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rebuild button */}
          <button onClick={() => setSchedule(null)}
            style={{ width:'100%', padding:'15px', background:'transparent', color:'#aaaaaa', fontFamily:"'Share Tech Mono',monospace", fontSize:11, letterSpacing:2, textTransform:'uppercase', border:'1px solid #2a2a2a', cursor:'pointer' }}>
            ← Rebuild Schedule
          </button>
        </div>
      )}
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
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('user_profiles')
            .select('plan')
            .eq('id', session.user.id)
            .single()
          if (error || !profile) {
            // Profile fetch failed — sign out completely to avoid stale state
            await supabase.auth.signOut()
            setIsLoggedIn(false)
            setIsPro(false)
            localStorage.clear()
            sessionStorage.clear()
          } else {
            setIsLoggedIn(true)
            setIsPro(profile.plan === 'pro')
          }
        } else {
          setIsLoggedIn(false)
          setIsPro(false)
          const dismissed = sessionStorage.getItem('bby_welcome_dismissed')
          if (!dismissed) setWelcomeOpen(true)
        }
      } catch(err) {
        setIsLoggedIn(false)
        setIsPro(false)
      }
      setSessionLoading(false)
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

  const handleSignOut = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation() }
    supabase.auth.signOut().catch(() => {})
    setIsLoggedIn(false)
    setIsPro(false)
    setActiveTab(0)
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = window.location.origin
  }

  const handleUpgrade = () => {
    window.open('https://builtbyyelyk.com/pricing','_blank')
    addToast('Opening pricing...','info')
  }

  const renderTab = () => {
    switch(activeTab) {
      case 0: return <MacroCalculator isPro={isPro} onUpgrade={handleUpgrade} addToast={addToast} onMacrosCalculated={setLastMacros}/>
      case 1: return isPro ? <TrainingScore addToast={addToast} /> : <Paywall feature="Training Score" onUpgrade={handleUpgrade}/>
      case 2: return isPro ? <MealTimingEngine addToast={addToast} /> : <Paywall feature="Meal Timing" onUpgrade={handleUpgrade}/>
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
