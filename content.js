/* Edit workshop dates, agenda, organizers and confirmed speakers here.
   Plain JavaScript keeps this site build-free and directly usable on GitHub Pages.
   Empty speaker lists deliberately render the public “To be announced” message. */
window.COEI_CONTENT = {
  organizers: [
    { name: 'Huseyin Arslan', affiliation: 'Istanbul Medipol University', initials: 'HA', photo: 'assets/people/huseyin-arslan.jpg' },
    { name: 'Shuai Wang', affiliation: 'SIAT, Chinese Academy of Sciences', initials: 'SW', photo: 'assets/people/shuai-wang.jpg' }
  ],
  // Example after confirmation:
  // { name: 'Full name', affiliation: 'Institution', title: 'Talk title',
  //   abstract: 'Approved abstract', photo: 'assets/people/person.jpg' }
  keynoteSpeakers: [],
  invitedSpeakers: [],
  program: [
    { id: 'oct30', weekday: 'Friday', date: 'October 30', title: 'Welcome reception', sessions: [
      ['18:00–18:30', 'Arrival and registration'],
      ['18:30–18:45', 'Welcome remarks'],
      ['18:45–20:00', 'Welcome reception']
    ] },
    { id: 'oct31', weekday: 'Saturday', date: 'October 31', title: 'Technical program', sessions: [
      ['09:00–09:20', 'Registration and poster setup'],
      ['09:20–09:30', 'Group photo'],
      ['09:30–09:45', 'Opening remarks'],
      ['09:45–10:15', 'Keynote talk 1'],
      ['10:15–10:45', 'Keynote talk 2'],
      ['10:45–11:15', 'Coffee, posters, and networking'],
      ['11:15–12:15', 'Morning invited talks'],
      ['12:15–13:30', 'Lunch and student poster session'],
      ['13:30–14:30', 'Afternoon invited talks'],
      ['14:30–15:00', 'Coffee, posters, and networking']
    ] },
    { id: 'nov01', weekday: 'Sunday', date: 'November 1', title: 'Keynotes & panel', sessions: [
      ['09:00–09:30', 'Morning coffee and arrival'],
      ['09:30–10:00', 'Keynote talk 3'],
      ['10:00–10:30', 'Keynote talk 4'],
      ['10:30–10:50', 'Coffee break'],
      ['10:50–11:35', 'Keynote panel discussion'],
      ['11:35–11:50', 'Closing remarks']
    ] },
    { id: 'nov02', weekday: 'Monday', date: 'November 2', title: 'University & industry', sessions: [
      ['09:00–09:30', 'Assembly and departure'],
      ['09:30–12:00', 'Istanbul Medipol University visit'],
      ['12:00–14:00', 'Lunch'],
      ['14:00–16:30', 'Industry visit'],
      ['16:30–17:00', 'Visit wrap-up and return']
    ] }
  ]
};
