const config = {
  target: "Mitch O'Farrell",
  total_cash: 650274,
  candidate: 'Hugo Soto-Martinez',
  district: 'CD13',
  candidate_pronoun: 'him',
  candidate_pronoun2: 'he',
  candidate_bio:
    'An urban planner by trade, her time co-chairing the Silver Lake Neighborhood Council’s Homelessness Committee led her and others to start SELAH Neighborhood Homeless Coalition in 2017. It’s now one of the most active homeless services nonprofits in the city conducting weekly outreach programs, operating access centers providing hot meals, case management, showers and clothes. She also served as the first executive director of Time’s Up Entertainment, the organization that arose from the #MeToo activism. She worked to establish mentorship programs for women in the industry and publish comprehensive Know your Rights resources related to sexual misconduct in the workplace.'
}
config.target_first = config.target.split(' ')[0]
config.candidate_first = config.candidate.split(' ')[0]
export default config
