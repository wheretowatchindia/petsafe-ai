import type { SymptomItem } from '../types';

export const SYMPTOM_DATABASE: SymptomItem[] = [
  // ================= CRITICAL EMERGENCY RED FLAGS =================
  {
    id: 'difficulty-breathing',
    name: 'Difficulty Breathing / Choking / Cyanosis',
    category: 'critical',
    isEmergencyRedFlag: true,
    urgency: 'emergency',
    description: 'Pet is struggling for air, panting rapidly at rest, breathing with an open mouth (cats), extending neck to breathe, or has blue/pale gums.',
    dogSpecificNotes: 'Can indicate congestive heart failure, tracheal collapse, foreign object obstruction, or heatstroke.',
    catSpecificNotes: 'OPEN-MOUTH BREATHING IN CATS IS ALWAYS A SEVERE MEDICAL EMERGENCY (feline asthma attack, pleural effusion, or heart failure).',
    possibleCauses: [
      'Airway obstruction / Choking',
      'Acute allergic anaphylaxis',
      'Feline asthma / Bronchospasm',
      'Congestive Heart Failure / Pulmonary edema',
      'Smoke or toxin inhalation',
      'Chest trauma / Pneumothorax'
    ]
  },
  {
    id: 'collapse-unresponsive',
    name: 'Collapse / Inability to Stand / Unresponsiveness',
    category: 'critical',
    isEmergencyRedFlag: true,
    urgency: 'emergency',
    description: 'Pet falls over suddenly, cannot stand up, is limp, disoriented, or minimally responsive to voice and touch.',
    dogSpecificNotes: 'High suspicion of internal bleeding (splenic hemangiosarcoma rupture), severe hypoglycemia, bloat (GDV), or cardiac syncope.',
    catSpecificNotes: 'Could indicate aortic thromboembolism (saddle thrombus - paralyzes rear legs and causes intense pain) or severe anemia/shock.',
    possibleCauses: [
      'Cardiovascular syncope / Sudden heart failure',
      'Internal hemorrhage (bleeding tumor)',
      'Severe hypoglycemia (low blood sugar)',
      'Severe toxic ingestion (Xylitol, organophosphates)',
      'Aortic thromboembolism (cats)',
      'Heatstroke or severe hypothermia'
    ]
  },
  {
    id: 'active-seizures',
    name: 'Active Seizures / Convulsions / Tremors',
    category: 'critical',
    isEmergencyRedFlag: true,
    urgency: 'emergency',
    description: 'Violent muscle jerking, paddling of legs, jaw snapping, drooling, loss of consciousness, or involuntary urination/defecation.',
    dogSpecificNotes: 'Cluster seizures (more than 1 in 24 hrs) or any seizure lasting >3 minutes (status epilepticus) causes irreversible brain damage and hyperthermia.',
    catSpecificNotes: 'Seizures in cats are frequently caused by toxic exposures (pyrethrin dog flea meds applied to cats) or intracranial disease.',
    possibleCauses: [
      'Ingestion of neurotoxins (Slug bait/metaldehyde, Permethrin/pyrethroids, Chocolate, Xylitol)',
      'Idiopathic epilepsy',
      'Severe liver shunt (Hepatic encephalopathy)',
      'Brain trauma or tumor',
      'Severe electrolyte imbalance or hypoglycemia'
    ]
  },
  {
    id: 'suspected-poisoning',
    name: 'Suspected Poisoning / Toxin Ingestion',
    category: 'critical',
    isEmergencyRedFlag: true,
    urgency: 'emergency',
    description: 'Pet consumed, chewed, or was directly exposed to a known poison (lilies, rat bait, antifreeze, medication, toxic plants, dark chocolate).',
    dogSpecificNotes: 'Rapid action within 1-2 hours allows safe veterinary emesis and activated charcoal decontamination.',
    catSpecificNotes: 'Lilies, acetaminophen, ethylene glycol, and permethrin flea products are acutely fatal without rapid treatment.',
    possibleCauses: [
      'Household rodenticides / insecticides',
      'Human pharmaceuticals (NSAIDs, Tylenol, antidepressants)',
      'Toxic plants (Lilies for cats, Sago Palm, Oleander)',
      'Automotive antifreeze',
      'Food toxins (Xylitol, Grapes, Dark Chocolate)'
    ]
  },
  {
    id: 'bloat-gdv-retching',
    name: 'Bloated Abdomen & Unproductive Retching',
    category: 'critical',
    isEmergencyRedFlag: true,
    urgency: 'emergency',
    description: 'Dog tries to vomit repeatedly but brings up only white foam or nothing; abdomen is visibly tight and swollen like a drum.',
    dogSpecificNotes: 'CLASSIC GDV (GASTRIC DILATATION-VOLVULUS / BLOAT). The stomach twists, cutting off blood supply. Can be fatal within 1-2 hours without emergency surgery.',
    catSpecificNotes: 'Extremely rare in cats, but abdominal enlargement can indicate feline infectious peritonitis (FIP) or severe fluid effusion.',
    possibleCauses: [
      'Gastric Dilatation-Volvulus (GDV / Bloat)',
      'Acute gastric distension',
      'Severe gastrointestinal foreign body obstruction'
    ]
  },
  {
    id: 'straining-to-urinate',
    name: 'Straining to Urinate / Inability to Urinate',
    category: 'critical',
    isEmergencyRedFlag: true,
    urgency: 'emergency',
    description: 'Pet visits litter box or crouches outdoors repeatedly, cries in pain, strains with little to no urine produced, or licks genitals constantly.',
    dogSpecificNotes: 'Bladder stones or prostate enlargement can cause urethral blockage.',
    catSpecificNotes: 'MALE CATS: URETHRAL OBSTRUCTION ("BLOCKED TOM") IS A FATAL EMERGENCY. Potassium levels spike, triggering cardiac arrest within 24–48 hours.',
    possibleCauses: [
      'Feline urethral obstruction (mucus plugs/struvite crystals)',
      'Urolithiasis (bladder/urethral stones)',
      'Severe feline lower urinary tract disease (FLUTD)',
      'Acute urinary tract infection with severe inflammation'
    ]
  },

  // ================= DIGESTIVE & SYSTEMIC =================
  {
    id: 'vomiting',
    name: 'Vomiting / Nausea',
    category: 'digestive',
    isEmergencyRedFlag: false,
    urgency: 'urgent',
    description: 'Active stomach contraction bringing up food, yellow bile, foam, or blood. More than twice in 24 hours warrants veterinary evaluation.',
    dogSpecificNotes: 'Frequent cause is dietary indiscretion (eating trash/table scraps), foreign body ingestion (balls, socks), or pancreatitis.',
    catSpecificNotes: 'Cats that vomit repeatedly or go without food for 24-48 hours can develop life-threatening Hepatic Lipidosis (fatty liver).',
    possibleCauses: [
      'Dietary indiscretion or sudden food change',
      'Gastrointestinal foreign object obstruction',
      'Pancreatitis (especially after high-fat foods)',
      'Infectious gastritis / Parvovirus / Panleukopenia',
      'Toxin ingestion'
    ]
  },
  {
    id: 'diarrhea',
    name: 'Diarrhea / Loose Watery Stool',
    category: 'digestive',
    isEmergencyRedFlag: false,
    urgency: 'urgent',
    description: 'Frequent liquid stools, presence of mucus, or black tarry blood (melena) or bright red blood (hematochezia).',
    dogSpecificNotes: 'Black tarry stool indicates upper GI bleeding (ulcers). Profuse watery diarrhea in unvaccinated puppies is a Parvovirus warning.',
    catSpecificNotes: 'Dehydration develops rapidly in small cats and kittens with diarrhea.',
    possibleCauses: [
      'Intestinal parasites (Giardia, Roundworms, Coccidia)',
      'Bacterial overgrowth / Salmonella / Campylobacter',
      'Food allergy or food intolerance',
      'Inflammatory Bowel Disease (IBD)',
      'Medication reaction'
    ]
  },
  {
    id: 'loss-of-appetite',
    name: 'Loss of Appetite (Anorexia)',
    category: 'digestive',
    isEmergencyRedFlag: false,
    urgency: 'urgent',
    description: 'Pet completely refuses their favorite food, treats, or water for 24 hours or longer.',
    dogSpecificNotes: 'Healthy adult dogs can safely fast for a day, but accompany with hydration check (gums moist vs tacky).',
    catSpecificNotes: 'CRITICAL IN CATS: If an overweight cat stops eating for 2–3 days, stored body fat mobilizes to the liver, causing fatal Feline Hepatic Lipidosis.',
    possibleCauses: [
      'Severe dental disease / Tooth root abscess / Mouth ulcer',
      'Underlying kidney or liver disease',
      'Fever / Infection',
      'Pancreatitis',
      'Nausea from GI disease or stress'
    ]
  },
  {
    id: 'lethargy',
    name: 'Severe Lethargy / Extreme Weakness',
    category: 'behavior',
    isEmergencyRedFlag: false,
    urgency: 'urgent',
    description: 'Pet is unusually dull, sleeps constantly, does not greet you, has trouble lifting their head, or refuses to play or walk.',
    dogSpecificNotes: 'Lethargy accompanied by pale gums is a sign of internal bleeding, tick-borne disease, or anemia.',
    catSpecificNotes: 'Sick cats instinctively hide under beds, in closets, or dark quiet corners.',
    possibleCauses: [
      'Systemic infection with high fever',
      'Severe anemia / Red blood cell loss',
      'Organ dysfunction (kidney/liver/heart failure)',
      'Endocrine disorders (Addisonian crisis, diabetic ketoacidosis)',
      'Pain or arthritis flare-up'
    ]
  },
  {
    id: 'itching-scratching',
    name: 'Intense Itching / Hot Spots / Hair Loss',
    category: 'skin',
    isEmergencyRedFlag: false,
    urgency: 'monitor',
    description: 'Non-stop scratching, biting at paws, chewing tail base, head shaking, red inflamed patches (hot spots), or hair loss.',
    dogSpecificNotes: 'Flea allergy dermatitis, environmental atopy (pollen/dust), or food protein allergy (chicken, beef).',
    catSpecificNotes: 'Excessive barbering/overgrooming belly and flanks often points to flea bite hypersensitivity or feline psychogenic alopecia.',
    possibleCauses: [
      'Flea allergy dermatitis (FAD) - single flea bite reaction',
      'Sarcoptic or Demodectic mange (mites)',
      'Secondary bacterial or yeast dermatitis',
      'Food protein allergy',
      'Ear mites or otitis externa'
    ]
  },
  {
    id: 'coughing-wheezing',
    name: 'Coughing / Wheezing / Reverse Sneezing',
    category: 'respiratory',
    isEmergencyRedFlag: false,
    urgency: 'urgent',
    description: 'Dry hacking "honking" cough (like a goose), wet phlegmy cough, or wheezing sounds.',
    dogSpecificNotes: 'Honking cough in small dogs indicates Tracheal Collapse; hacking after dog park or boarding indicates Canine Infectious Respiratory Disease ("Kennel Cough").',
    catSpecificNotes: 'Coughing in cats is often mistaken for trying to produce a hairball, but is actually Feline Asthma or heartworm disease.',
    possibleCauses: [
      'Canine Infectious Tracheobronchitis (Kennel Cough)',
      'Feline Asthma',
      'Tracheal Collapse (Toy breeds)',
      'Heartworm disease',
      'Congestive Heart Failure / Cardiomyopathy'
    ]
  }
];
