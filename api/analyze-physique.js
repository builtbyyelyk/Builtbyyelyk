export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { imageUrl, stats } = req.body
  if (!imageUrl) return res.status(400).json({ error: 'No image URL provided' })
  try {
    const goalLabels = { aggressive_cut:'Aggressive Cut', moderate_cut:'Moderate Cut', maintain:'Maintenance', lean_bulk:'Lean Bulk', bulk:'Bulk' }
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'url', url: imageUrl } },
            { type: 'text', text: `You are an expert physique coach. Analyze this physique photo with these stats: Gender: ${stats.gender}, Weight: ${stats.weight}lbs, Height: ${stats.height}, Body Fat: ${stats.bodyFat || 'not provided'}%, Goal: ${goalLabels[stats.goal] || stats.goal}.

Provide feedback in EXACTLY this structure:

**OVERALL ASSESSMENT**
2-3 sentences on overall physique development and conditioning.

**STRENGTHS**
List 3 specific muscle groups or qualities that are well-developed.

**AREAS TO IMPROVE**
List 3 specific areas that need the most work.

**TRAINING RECOMMENDATIONS**
3-4 specific training adjustments to address weak points.

**NUTRITION NOTES**
2-3 sentences connecting their stats to what you observe.

**COACH'S BOTTOM LINE**
1-2 sentences of direct honest coaching advice.

Be specific and honest. No generic statements.` }
          ]
        }]
      })
    })
    const data = await response.json()
    if (!response.ok) return res.status(500).json({ error: data.error?.message || 'API error' })
    const text = data.content?.[0]?.text || ''
    res.status(200).json({ analysis: text })
  } catch (err) {
    console.error('analyze-physique error:', err)
    res.status(500).json({ error: err.message })
  }
}
