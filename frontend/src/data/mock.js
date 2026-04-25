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
    term: "WS 2024\u201325 (forthcoming)"
  },
  {
    role: "Research Demonstrator",
    course: "STREAM \u2014 IISER Berhampur Open Day",
    institution: "IISER Berhampur",
    term: "2021\u20132023"
  },
  {
    role: "Mentor",
    course: "Jigyansa Science Communication Workshops",
    institution: "IISER Berhampur \u00d7 Vigyan Prasar",
    term: "2020\u20132023"
  }
];

export const service = [
  {
    role: "Ex\u2011President & Tech Advisor",
    org: "Jigyansa \u2014 Science Communication Platform",
    period: "2021\u20132023"
  },
  {
    role: "Core Team Member",
    org: "Naxatra Astrocosmo Club, IISER Berhampur",
    period: "2020\u20132023"
  },
  {
    role: "Former Secretary & Tech Lead",
    org: "Innovation Incubation & Entrepreneurship Cell, IISER",
    period: "2021\u20132022"
  }
];
