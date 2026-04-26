// Mock data extracted & curated from soumyajitsamal.in
// This will be replaced with backend data when integrated.

export const profile = {
  name: "Soumyajit Samal",
  shortName: "S. Samal",
  tagline: "Doctoral Researcher · Quantum Materials & 2D Nanoelectronics",
  pronouns: "he/him",
  currentRole:
    "Incoming PhD Candidate, Ludwig-Maximilians-Universit\u00e4t M\u00fcnchen (LMU Munich)",
  advisor: "Prof. Dmitri Efetov",
  startDate: "September 2024",
  location: "Munich, Germany",
  email: "soumyajit.samal@physik.uni-muenchen.de",
  altEmail: "soumyajit.samal@iiserbpr.ac.in",
  cvUrl: "#",
  scholarUrl: "https://scholar.google.com/",
  orcid: "0000-0000-0000-0000",
  github: "https://github.com/soumyajits2000",
  linkedin: "https://linkedin.com/in/soumyajitsamal",
  twitter: "https://twitter.com/",
  bio: `I am a physicist working at the intersection of condensed matter and quantum nanoelectronics. My research probes the electronic landscape of atomically thin van der Waals materials \u2014 graphene, transition\u2011metal dichalcogenides, and their twisted heterostructures \u2014 using superconducting microwave resonators and low\u2011temperature transport.`,
  longBio: `Our civilization rests on a thin layer of silicon. As Moore\u2019s law approaches its quantum limit, the search for new electronic materials becomes a defining problem of our era. I work with two\u2011dimensional materials \u2014 sheets just one atom thick \u2014 to understand how electrons behave in these unusual environments and to engineer the next generation of devices: from ultrafast transistors to neural implants.\n\nMy approach combines nanofabrication of van der Waals heterostructures, superconducting cavity quantum electrodynamics, and computational modelling. I am particularly drawn to questions where many\u2011body physics meets device engineering \u2014 places where fundamental science can shape technology a decade from now.`
};

export const researchInterests = [
  {
    title: "Quantum Transport in van der Waals Heterostructures",
    description:
      "Coherent electronic phenomena in twisted bilayer and trilayer graphene; correlated and superconducting phases at magic angles."
  },
  {
    title: "Superconducting Microwave Sensing",
    description:
      "Coplanar waveguide resonators as non\u2011invasive probes of compressibility, density of states, and band structure in 2D materials."
  },
  {
    title: "Nanofabrication & Device Engineering",
    description:
      "Electron\u2011beam and photolithography of low\u2011contact\u2011resistance devices for monolayer TMDCs and graphene stacks."
  },
  {
    title: "Machine Learning for Condensed Matter",
    description:
      "Deep\u2011learning surrogates for Raman spectra, critical\u2011temperature prediction in superconductors, and quantum machine learning."
  }
];

export const news = [
  {
    date: "Sep 2024",
    text: "Beginning my PhD with Prof. Dmitri Efetov at LMU Munich."
  },
  {
    date: "Feb 2024",
    text:
      "Co\u2011authored paper accepted in ACS Nano Letters \u2014 superconducting cavity sensing of 2D bandgaps."
  },
  {
    date: "Apr 2023",
    text: "Review article published in RSC Nanoscale on MXene electrodes & ML."
  },
  {
    date: "2023",
    text: "Joined the Nanoelectronics Group at TIFR Mumbai for MS thesis with Prof. Mandar M. Deshmukh."
  }
];

export const education = [
  {
    institution: "Ludwig\u2011Maximilians\u2011Universit\u00e4t M\u00fcnchen (LMU Munich)",
    location: "Munich, Germany",
    period: "2024 \u2014 Present",
    degree: "Doctor of Philosophy (Ph.D.), Experimental Physics",
    advisor: "Prof. Dmitri Efetov",
    note: "Quantum transport in twisted graphene heterostructures."
  },
  {
    institution: "Tata Institute of Fundamental Research (TIFR)",
    location: "Mumbai, India",
    period: "2023 \u2014 2024",
    degree: "Master\u2019s Thesis \u2014 Nanoelectronics Group",
    advisor: "Prof. Mandar M. Deshmukh",
    note: "Superconducting Coplanar Waveguide Resonator\u2011assisted Microwave Probing of 2D Materials."
  },
  {
    institution: "Indian Institute of Science Education and Research (IISER) Berhampur",
    location: "Odisha, India",
    period: "2019 \u2014 2024",
    degree: "BS\u2011MS Dual Degree \u2014 Major in Physical Sciences, Minor in Computer Science",
    advisor: null,
    note:
      "Ex\u2011President & Tech Advisor, Jigyansa (Science Communication, IISER \u00d7 Vigyan Prasar). Core team, Naxatra Astrocosmo Club. Former Secretary, Innovation Incubation & Entrepreneurship Cell."
  },
  {
    institution: "DAV Public School, Pokhariput",
    location: "Bhubaneswar, India",
    period: "2016 \u2014 2018",
    degree: "CBSE Higher Secondary \u2014 Physics, Chemistry, Mathematics, Biology",
    advisor: null,
    note: null
  }
];

export const publications = [
  {
    id: "p1",
    type: "Journal",
    venue: "ACS Nano Letters",
    year: 2024,
    date: "23 February 2024",
    title:
      "Superconducting Cavity\u2011Based Sensing of Band Gaps in 2D Materials",
    authors: [
      "Krishnendu Maji",
      "Joydip Sarkar",
      "Supriya Mandal",
      "Sriram H.",
      "Mahesh Hingankar",
      "Ayshi Mukherjee",
      "Soumyajit Samal",
      "Anirban Bhattacharjee",
      "Meghan P. Patankar",
      "Kenji Watanabe",
      "Takashi Taniguchi",
      "Mandar M. Deshmukh"
    ],
    doi: "10.1021/acs.nanolett.3c04990",
    url: "https://pubs.acs.org/doi/full/10.1021/acs.nanolett.3c04990"
  },
  {
    id: "p2",
    type: "Review",
    venue: "RSC Nanoscale",
    year: 2023,
    date: "25 April 2023",
    title:
      "A review on accelerated development of skin\u2011like MXene electrodes: from experimental to machine learning",
    authors: [
      "Romy Garg",
      "Nikhil Ram Patra",
      "Soumyajit Samal",
      "Subham Babbar",
      "Kaushik Parida"
    ],
    doi: "10.1039/D2NR05969J",
    url: "https://doi.org/10.1039/D2NR05969J"
  },
  {
    id: "p3",
    type: "In Preparation",
    venue: "Manuscript in preparation",
    year: 2025,
    date: "Forthcoming",
    title:
      "Microwave Compressibility Spectroscopy of Twisted Trilayer Graphene",
    authors: ["Soumyajit Samal", "and collaborators"],
    doi: null,
    url: null
  }
];

export const researchProjects = [
  {
    id: "r1",
    title:
      "Superconducting Coplanar Waveguide Resonator\u2011assisted Microwave Probing of 2D Materials",
    role: "Master\u2019s Thesis",
    advisor: "Prof. Mandar M. Deshmukh",
    institution: "TIFR, Mumbai",
    period: "2023 \u2014 2024",
    summary:
      "Capacitively coupled van der Waals heterostructures (bilayer graphene, twisted double bilayer & trilayer graphene) to a 1\u201310 GHz transmission\u2011line resonator (Q \u2248 500) to extract capacitance and density of states without optical contact. A portion of this work appeared in ACS Nano Letters.",
    tags: ["Superconducting resonators", "Twisted graphene", "RF transport"]
  },
  {
    id: "r2",
    title: "Numerical Simulation of DNA Detection using Graphene FETs",
    role: "Independent Project",
    advisor: "Dr. Achanta Venugopal",
    institution: "TIFR, Mumbai",
    period: "2022",
    summary:
      "Monte\u2011Carlo + numerical models for the electrostatic potential and I\u2011V characteristics of a graphene FET in the presence of charged biomolecules \u2014 mapping the sensitivity of GFETs as DNA biosensors.",
    tags: ["GFET", "Biosensing", "Numerical methods"]
  },
  {
    id: "r3",
    title:
      "Dielectric environment in graphene via Deep Learning of Raman Spectra",
    role: "Research Project",
    advisor: "Prof. Radha Krishna & Dr. Gopi Krishna Guntupalli",
    institution: "IISER Berhampur",
    period: "2022",
    summary:
      "Designed a CNN classifier on augmented Raman spectra (additive noise, peak shifting) to infer charge density and dielectric environment of graphene with 99% test accuracy.",
    tags: ["Raman", "CNN", "Graphene"]
  },
  {
    id: "r4",
    title: "Predicting Critical Temperature of Superconductors with ML",
    role: "Course Project",
    advisor: "Prof. Radha Krishna & Dr. Gopi Krishna Guntupalli",
    institution: "IISER Berhampur",
    period: "2021",
    summary:
      "Feature engineering on the SuperCon database and a regression pipeline that predicts critical temperature from room\u2011temperature properties (98.8% accuracy).",
    tags: ["Machine Learning", "Superconductivity"]
  },
  {
    id: "r5",
    title: "Wi\u2011Fi Indoor Localisation via Quantum Machine Learning",
    role: "Visiting Researcher",
    advisor: "Dr. Ahmed Farouk",
    institution: "Wilfrid Laurier University, Canada",
    period: "2021",
    summary:
      "A Qiskit\u2011based quantum simulation of a CML algorithm for localising users inside large structures using ambient Wi\u2011Fi access points \u2014 with applications to post\u2011disaster reconnaissance.",
    tags: ["Qiskit", "QML", "Localisation"]
  },
  {
    id: "r6",
    title: "Quantum Simulation of Graphene (VQE)",
    role: "Summer Research",
    advisor: "Prof. Prashanta Kumar Panigrahi",
    institution: "IISER Kolkata",
    period: "2021",
    summary:
      "Variational Quantum Eigensolver with Qiskit Nature to estimate ground\u2011state and low\u2011lying excited\u2011state energies of small graphene fragments.",
    tags: ["VQE", "Quantum Chemistry"]
  },
  {
    id: "r7",
    title:
      "Fabrication of Microscale Metallic Contacts on Exfoliated Graphene",
    role: "Internship",
    advisor: "Dr. Satyaprakash Sahoo",
    institution: "Institute of Physics, Bhubaneswar",
    period: "2020",
    summary:
      "Mechanically exfoliated graphene flakes contacted with Au, Ag, Al via photolithography. Optimised photoresist (ma\u2011P 1205) thickness and lift\u2011off chemistry.",
    tags: ["Photolithography", "Exfoliation"]
  }
];

export const codeProjects = [
  {
    id: "c1",
    course: "PHY 312 \u2013 Numerical Methods",
    title: "GFET\u2011DNA Detection Simulation",
    description:
      "Computational modelling of DNA detection using graphene FETs \u2014 Monte\u2011Carlo + numerical electrostatics, I\u2011V curves, potential maps.",
    repo: "https://github.com/soumyajits2000/GFET-DNA_Detection",
    stack: ["Python", "NumPy", "Matplotlib"]
  },
  {
    id: "c2",
    course: "PHY 312",
    title: "Wavefunction of Nucleons in a Spherical Well",
    description:
      "Newton\u2013Raphson solver for spherical Bessel functions; visualisation of nuclear wavefunctions for varying principal quantum number.",
    repo: "https://github.com/soumyajits2000/nucleons_spherical_potential",
    stack: ["Python", "SciPy"]
  },
  {
    id: "c3",
    course: "IDC 301",
    title: "Predicting Tc of Superconductors",
    description:
      "ML pipeline on the SuperCon dataset; correlation analysis and regression for critical temperature.",
    repo: "https://github.com/soumyajits2000/superconductors_prediction_ML",
    stack: ["scikit\u2011learn", "Pandas"]
  },
  {
    id: "c4",
    course: "IDC 302",
    title: "Graphene Environment from Raman + DL",
    description:
      "CNN classifier on Raman spectra to infer charge / dielectric environment of graphene.",
    repo: "https://github.com/soumyajits2000/graphene_env_properties",
    stack: ["TensorFlow", "Python"]
  },
  {
    id: "c5",
    course: "IISER Kolkata",
    title: "Spam Detection on IBMQ",
    description:
      "Quantum machine\u2011learning classifier for E\u2011mail spam, validated on IBM\u2019s 5\u2011qubit X2 hardware.",
    repo: "https://github.com/soumyajits2000/Spam_detection_IBMQ",
    stack: ["Qiskit", "IBM Quantum"]
  }
];

export const skills = [
  { group: "Experimental", items: ["Nanofabrication of vdW heterostructures", "Electron\u2011Beam Lithography", "Photolithography", "Cryogenic transport", "Microwave / RF measurement"] },
  { group: "Computational", items: ["Python", "MATLAB", "Qiskit", "PyTorch / TensorFlow", "Microwave simulation (Sonnet, HFSS)"] },
  { group: "Methods", items: ["Many\u2011body theory (intro)", "Numerical analysis", "Statistical / ML modelling", "Scientific writing & illustration"] }
];

export const talks = [
  {
    title: "Microwave probing of twisted graphene heterostructures",
    venue: "RPGR Conference",
    location: "Bengaluru, India",
    date: "2024",
    type: "Poster"
  },
  {
    title: "Superconducting cavity sensing of 2D materials",
    venue: "TIFR Nanoelectronics Group Seminar",
    location: "Mumbai, India",
    date: "2023",
    type: "Talk"
  },
  {
    title: "Quantum simulation of graphene with VQE",
    venue: "Summer School Symposium, IISER Kolkata",
    location: "Kolkata, India",
    date: "2021",
    type: "Talk"
  }
];

export const awards = [
  {
    year: "2024",
    title: "DAAD\u2011IISER Doctoral Fellowship",
    org: "Anticipated"
  },
  {
    year: "2023",
    title: "Visiting Student Research Programme (VSRP)",
    org: "Tata Institute of Fundamental Research"
  },
  {
    year: "2022",
    title: "Summer Research Fellowship",
    org: "Indian Academy of Sciences (anticipated entry)"
  },
  {
    year: "2019",
    title: "INSPIRE Scholarship for Higher Education",
    org: "Department of Science & Technology, Government of India"
  }
];

export const teaching = [
  {
    role: "Teaching Assistant",
    course: "Experimental Physics Laboratory",
    institution: "LMU Munich",
    term: "WS 2024\u201325 (forthcoming)",
    blurb:
      "Guiding undergraduate students through experiments in solid\u2011state and quantum transport.",
    image:
      "https://images.unsplash.com/photo-1641735123823-90856d1efd39?auto=format&fit=crop&w=1200&q=70"
  },
  {
    role: "Research Demonstrator",
    course: "STREAM \u2014 IISER Berhampur Open Day",
    institution: "IISER Berhampur",
    term: "2021\u20132023",
    blurb:
      "Live demonstrations of optical phenomena and graphene fabrication for visiting students.",
    image:
      "https://images.pexels.com/photos/8197528/pexels-photo-8197528.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    role: "Mentor",
    course: "Jigyansa Science Communication Workshops",
    institution: "IISER Berhampur \u00d7 Vigyan Prasar",
    term: "2020\u20132023",
    blurb:
      "Mentored undergraduate writers and editors in producing the Jigyansa magazine and online articles.",
    image:
      "https://images.unsplash.com/photo-1576673195903-bb573ef5a755?auto=format&fit=crop&w=1200&q=70"
  }
];

export const service = [
  {
    role: "Ex\u2011President & Tech Advisor",
    org: "Jigyansa \u2014 Science Communication Platform",
    period: "2021\u20132023",
    blurb:
      "Led editorial direction, web infrastructure and outreach for IISER Berhampur's flagship science\u2011communication body in collaboration with Vigyan Prasar.",
    image:
      "https://images.pexels.com/photos/2399033/pexels-photo-2399033.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    role: "Core Team Member",
    org: "Naxatra Astrocosmo Club, IISER Berhampur",
    period: "2020\u20132023",
    blurb:
      "Organised public telescope nights, astrophotography sessions and outreach events for the campus and nearby schools.",
    image:
      "https://images.unsplash.com/photo-1644177291240-8692ccdd9cdc?auto=format&fit=crop&w=1200&q=70"
  },
  {
    role: "Former Secretary & Tech Lead",
    org: "Innovation Incubation & Entrepreneurship Cell, IISER",
    period: "2021\u20132022",
    blurb:
      "Built and maintained the IIEC web platform and coordinated student\u2011led innovation workshops with industry mentors.",
    image:
      "https://images.pexels.com/photos/12888439/pexels-photo-12888439.jpeg?auto=compress&cs=tinysrgb&w=1200"
  }
];

export const galleryImages = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1644177291240-8692ccdd9cdc?auto=format&fit=crop&w=1400&q=70",
    caption: "Observatory dome under a moonless sky, Naxatra astrophotography session.",
    category: "astro",
    aspect: "tall"
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1469980098053-382eb10ba017?auto=format&fit=crop&w=1400&q=70",
    caption: "Circular star trails, captured during a long\u2011exposure outreach event.",
    category: "astro",
    aspect: "wide"
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1761071176091-7da66403d24a?auto=format&fit=crop&w=1200&q=70",
    caption: "Cryogenic transport setup at TIFR, Mumbai \u2014 the heart of the experiment.",
    category: "lab",
    aspect: "tall"
  },
  {
    id: "g4",
    src: "https://images.pexels.com/photos/2399033/pexels-photo-2399033.jpeg?auto=compress&cs=tinysrgb&w=1400",
    caption: "RPGR conference, Bengaluru \u2014 with the Nanoelectronics group.",
    category: "academic",
    aspect: "wide"
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1765207633730-001e54ec6aba?auto=format&fit=crop&w=1200&q=70",
    caption: "Photolithography mask under the microscope \u2014 first contacts on graphene.",
    category: "lab",
    aspect: "square"
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1470081989310-425cc509b8f2?auto=format&fit=crop&w=1400&q=70",
    caption: "Star trails over the Eastern Ghats during a Naxatra retreat.",
    category: "astro",
    aspect: "wide"
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1774094474808-904ab1ad8586?auto=format&fit=crop&w=1200&q=70",
    caption: "TIFR seminar \u2014 first time presenting the resonator results.",
    category: "academic",
    aspect: "tall"
  },
  {
    id: "g8",
    src: "https://images.pexels.com/photos/4060893/pexels-photo-4060893.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "A single illuminated tree under spinning stars \u2014 long\u2011exposure trial.",
    category: "astro",
    aspect: "tall"
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1758573466942-fbc45731e6eb?auto=format&fit=crop&w=1200&q=70",
    caption: "Hands\u2011on demonstration during STREAM open day at IISER Berhampur.",
    category: "outreach",
    aspect: "square"
  },
  {
    id: "g10",
    src: "https://images.unsplash.com/photo-1773828746476-7ca780cdcb82?auto=format&fit=crop&w=1400&q=70",
    caption: "Quantum dots seminar \u2014 a Tuesday afternoon at TIFR.",
    category: "academic",
    aspect: "wide"
  },
  {
    id: "g11",
    src: "https://images.pexels.com/photos/12888439/pexels-photo-12888439.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Visit to a space\u2011technology gallery during an IIEC field trip.",
    category: "outreach",
    aspect: "tall"
  },
  {
    id: "g12",
    src: "https://images.pexels.com/photos/10145028/pexels-photo-10145028.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Outreach with school students \u2014 explaining the Earth\u2011Moon system.",
    category: "outreach",
    aspect: "wide"
  }
];

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "astro", label: "Astrophotography" },
  { id: "lab", label: "Lab" },
  { id: "academic", label: "Academic" },
  { id: "outreach", label: "Outreach" }
];

export const blogPosts = [
  {
    slug: "twisted-bilayer-graphene-reading-notes",
    title: "Reading notes on twisted bilayer graphene",
    excerpt:
      "Why a 1.1\u00b0 twist between two sheets of carbon launched a new chapter of condensed\u2011matter physics \u2014 a field guide for the curious.",
    category: "Research Notes",
    date: "May 14, 2025",
    readingTime: "12 min read",
    cover:
      "https://images.unsplash.com/photo-1568687316900-dd515e09f80a?auto=format&fit=crop&w=1600&q=70",
    body: [
      "It is rare in physics that a single number defines an entire research programme. For the moir\u00e9 community that number is 1.1\u00b0 \u2014 the so\u2011called \u2018magic angle\u2019 at which two stacked sheets of graphene, slightly twisted relative to one another, develop nearly flat electronic bands and a remarkable cascade of correlated phases.",
      "These notes are my attempt to make sense of why the magic angle exists at all, what \u2018flat band\u2019 really means in practice, and how superconducting and correlated\u2011insulating phases coexist within the same device. I will write in the language I myself wished I had a year ago: minimal jargon, careful definitions, and as many lattice diagrams as it takes.",
      "Section 1 \u2014 The continuum model and the moir\u00e9 superlattice. We start with two layers of graphene, each described by Dirac cones around K and K\u2032. A twist by an angle \u03b8 produces a beating pattern between the layers \u2014 the moir\u00e9 superlattice \u2014 with a periodicity that grows as 1/\u03b8 for small \u03b8. Already at this stage, two ideas matter: the moir\u00e9 unit cell can contain over 10\u2074 atoms, and the low\u2011energy physics is captured by an elegantly simple continuum theory due to Bistritzer and MacDonald.",
      "Section 2 \u2014 Flat bands and what they buy you. At the magic angle the bandwidth of the lowest moir\u00e9 bands collapses to a few meV, comparable to the Coulomb interaction within a unit cell. In this regime kinetic energy is no longer the dominant scale and the system organises itself by interactions \u2014 the textbook recipe for strong correlations.",
      "Section 3 \u2014 Experimental fingerprints. From transport one observes resistive peaks at integer fillings of the moir\u00e9 band, superconducting domes flanking those peaks, and \u2014 in clean enough samples \u2014 evidence for fragile topology and quantum anomalous Hall effects. Microwave probes (the family I work on) can directly measure the compressibility of these flat bands without the need for ohmic contacts \u2014 a particularly attractive feature given how delicate the contact resistance can be.",
      "I will keep extending this note as my own understanding sharpens. Treat it as a living document rather than a finished essay."
    ]
  },
  {
    slug: "microwaves-see-what-light-cannot",
    title: "Why microwaves see what light cannot",
    excerpt:
      "An introduction to superconducting cavity sensing of two\u2011dimensional materials \u2014 a non\u2011invasive probe of band structure.",
    category: "Methods",
    date: "Apr 02, 2025",
    readingTime: "9 min read",
    cover:
      "https://images.unsplash.com/photo-1565006070488-6bb3f39cdca6?auto=format&fit=crop&w=1600&q=70",
    body: [
      "Optical spectroscopy taught us most of what we know about excitations in solids. Yet for the lowest\u2011energy phenomena \u2014 the meV\u2011scale physics of flat bands, the energetics of correlated insulators, the soft modes of nearly\u2011melted Wigner crystals \u2014 visible and infrared light are simply too energetic.",
      "Microwave photons in the 1\u201310 GHz range, by contrast, carry energies of just a few \u00b5eV. Couple a clean two\u2011dimensional sample to a superconducting microwave resonator and you can read off its electronic compressibility, its conductivity, even its density of states, without ever soldering an ohmic contact onto the device.",
      "The trick is to design a resonator with a quality factor high enough that small changes in the sample loading produce measurable shifts in the resonance frequency. Coplanar waveguides patterned in NbN or TiN routinely reach Q values in the thousands. The sample sits as a capacitive shunt at the open end of the resonator and \u2014 voil\u00e0 \u2014 you have a probe that is non\u2011invasive, broadband and surprisingly sensitive.",
      "In our group at TIFR we built such a setup and used it to map the band gap of bilayer graphene as a function of displacement field. The technique generalises naturally to more exotic systems \u2014 twisted graphene, transition\u2011metal dichalcogenides, even van der Waals magnets \u2014 wherever contacts are difficult and the physics lives at low energies."
    ]
  },
  {
    slug: "starting-a-phd",
    title: "Reflections on starting a PhD",
    excerpt:
      "A short letter to my one\u2011year\u2011younger self, on the eve of leaving for Munich.",
    category: "Essay",
    date: "Mar 09, 2025",
    readingTime: "6 min read",
    cover:
      "https://images.unsplash.com/photo-1659386510402-e93799ec82a6?auto=format&fit=crop&w=1600&q=70",
    body: [
      "A PhD, an old advisor once told me, is less a degree than an apprenticeship in not knowing. You learn to live comfortably in the dark for three to five years \u2014 stumbling, occasionally cursing, sometimes seeing.",
      "Three things I would tell myself a year ago: keep a logbook. Write down the dumbest questions. Spend more time at the blackboard than at the computer.",
      "I will write more, here, as the year unfolds."
    ]
  },
  {
    slug: "first-cryostat-lab-diary",
    title: "Building your first cryostat: a lab diary",
    excerpt:
      "Practical notes from the first weeks of cooling down a custom dilution\u2011refrigerator probe.",
    category: "Lab Diary",
    date: "Jan 21, 2025",
    readingTime: "8 min read",
    cover:
      "https://images.unsplash.com/photo-1576673195903-bb573ef5a755?auto=format&fit=crop&w=1600&q=70",
    body: [
      "Day 1. The probe arrived in two crates from the workshop. The flange is misaligned by perhaps half a millimetre \u2014 small, but enough to give us a tiny vacuum leak we will be chasing for a week.",
      "Day 5. Helium leak detector. Mass\u201164. Repeat. The art of leak\u2011hunting is a meditation; you learn the rhythm of the pump, the smell of the lab on a winter morning, the precise tone of frustration in your supervisor\u2019s voice.",
      "Day 12. We hit base temperature. 18 mK. Resistance of our test resistor matches expectations within 1%. There is, in this room, a quiet euphoria that rarely makes it into papers."
    ]
  }
];

