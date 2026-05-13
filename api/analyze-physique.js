export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { imageBase64, stats } = req.body

  const goalLabels = {
    aggressive_cut: 'Aggressive Cut', moderate_cut: 'Moderate Cut',
    maintain: 'Maintenance', lean_bulk: 'Lean Bulk', bulk: 'Bulk'
  }

  const prompt = `You are an expert physique coach analyzing a client's physique photo combined with their stats. Provide honest, specific, actionable feedback in a structured format.

Client Stats:
- Gender: ${stats.gender}
- Weight: ${stats.weight} lbs
- Height: ${stats.height}
- Body Fat %: ${stats.bodyFat ? stats.bodyFat + '%' : 'Not provided'}
- Current Goal: ${goalLabels[stats.goal] || stats.goal}

Analyze the physique in the photo and provide feedback in EXACTLY this structure:

**OVERALL ASSESSMENT**
2-3 sentences on overall physique development, conditioning, and stage of development.

**STRENGTHS**
List 3 specific muscle groups or qualities that are well-developed.

**AREAS TO IMPROVE**
List 3 specific muscle groups or areas that need the most work.

**TRAINING RECOMMENDATIONS**
3-4 specific training adjustments to address the weak points.

**NUTRITION NOTES**
2-3 sentences connecting their stats and goal to what you observe.

**COACH'S BOTTOM LINE**
1-2 sentences of direct, honest coaching advice.

Be direct, specific, and honest. Avoid generic statements.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 1200,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: imageBase64 } },
            { type: 'text', text: prompt }
          ]
        }]
      })
    })

    const data = await response.json()
    if (!response.ok) return res.status(500).json({ error: data.error?.message || 'API error' })
    res.status(200).json({ analysis: data.content?.[0]?.text || '' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
