import type { SafetyItem } from '../types';

export const PET_SAFETY_DATABASE: SafetyItem[] = [
  // ================= FOODS =================
  {
    id: 'chocolate',
    name: 'Chocolate',
    scientificName: 'Theobroma cacao',
    category: 'food',
    aliases: ['cocoa', 'dark chocolate', 'milk chocolate', 'baking chocolate', 'cacao', 'cocoa powder', 'chocolate chips'],
    safetyDog: 'toxic',
    safetyCat: 'toxic',
    severity: 'severe',
    toxicCompounds: ['Theobromine', 'Caffeine (Methylxanthines)'],
    dogSummary: 'Extremely dangerous. Dogs metabolize theobromine much slower than humans. Dark chocolate, cocoa powder, and baker\'s chocolate carry the highest concentrations and can trigger arrhythmias, seizures, and death.',
    catSummary: 'Highly toxic to cats, although cats lack sweet taste receptors and rarely eat it voluntarily. Can cause rapid heart rate, tremors, and seizures.',
    commonSymptoms: ['Vomiting', 'Diarrhea', 'Restlessness / Hyperactivity', 'Rapid breathing', 'Muscle tremors', 'Elevated heart rate', 'Seizures'],
    precautions: [
      'Baker’s chocolate and dark chocolate are significantly more toxic than milk chocolate.',
      'Even small amounts of cocoa powder can be fatal for small pets.',
      'Never attempt to induce vomiting at home without direct veterinary instruction.'
    ],
    recommendedAction: 'Immediate emergency veterinary attention. Have the exact chocolate type, ounces consumed, and your pet’s weight ready for the vet or poison control.',
    references: [
      { title: 'Chocolate Poisoning in Dogs', organization: 'Merck Veterinary Manual', url: 'https://www.merckvetmanual.com' },
      { title: 'Chocolate Toxicity', organization: 'ASPCA Animal Poison Control', url: 'https://www.aspca.org' }
    ],
    toxicDosageInfo: 'Mild signs start at 20 mg/kg of theobromine; severe cardiovascular/neurological toxicity occurs above 40-50 mg/kg.'
  },
  {
    id: 'xylitol',
    name: 'Xylitol (Birch Sugar / Wood Sugar)',
    scientificName: 'Xylitol',
    category: 'food',
    aliases: ['birch bark extract', 'birch sugar', 'wood sugar', 'e967', 'sugar-free gum', 'sugar free sweetener'],
    safetyDog: 'toxic',
    safetyCat: 'caution',
    severity: 'fatal',
    toxicCompounds: ['Xylitol (Sugar alcohol)'],
    dogSummary: 'CRITICAL EMERGENCY. In dogs, xylitol stimulates an extreme release of insulin from the pancreas, dropping blood glucose to lethal levels within 10–60 minutes. Higher doses cause irreversible acute liver necrosis.',
    catSummary: 'Does not seem to trigger the same drastic insulin surge in cats, but safety is not established and ingestion should be avoided.',
    commonSymptoms: ['Vomiting', 'Loss of coordination (ataxia)', 'Extreme lethargy / collapse', 'Seizures', 'Jaundice (yellow gums/eyes)', 'Coma'],
    precautions: [
      'Check peanut butter, baked goods, gummies, toothpastes, and chewable vitamins for "birch sugar".',
      'Hypoglycemia can manifest in as little as 10 to 30 minutes.',
      'Do not wait for symptoms to appear before calling the vet.'
    ],
    recommendedAction: 'RUSH TO EMERGENCY VET IMMEDIATELY. Call ASPCA Poison Control ((888) 426-4435) while en route.',
    references: [
      { title: 'Xylitol Toxicity in Dogs', organization: 'FDA Animal Health', url: 'https://www.fda.gov' },
      { title: 'Birch Bark Extract Warnings', organization: 'ASPCA Animal Poison Control' }
    ],
    toxicDosageInfo: 'As little as 0.1 g/kg causes severe hypoglycemia; 0.5 g/kg can cause acute liver failure in dogs.'
  },
  {
    id: 'grapes-raisins',
    name: 'Grapes & Raisins',
    scientificName: 'Vitis vinifera',
    category: 'food',
    aliases: ['grape', 'raisin', 'sultana', 'currant (zante)', 'grape juice'],
    safetyDog: 'toxic',
    safetyCat: 'toxic',
    severity: 'fatal',
    toxicCompounds: ['Tartaric acid', 'Potassium bitartrate'],
    dogSummary: 'POTENTIALLY FATAL. Recent veterinary research identifies tartaric acid as the toxic principle causing sudden acute kidney failure in dogs. Toxicity is unpredictable—even a single grape can be toxic to sensitive dogs.',
    catSummary: 'Reported to cause kidney issues in cats as well. Cats should never be offered grapes or raisins under any circumstance.',
    commonSymptoms: ['Vomiting within 6-12 hours', 'Diarrhea', 'Extreme thirst', 'Decreased urination or complete lack of urine (anuria)', 'Abdominal pain', 'Severe lethargy'],
    precautions: [
      'Seedless, organic, cooked, or dried grapes/raisins are ALL equally dangerous.',
      'Raisins are concentrated and significantly more hazardous per gram than whole grapes.',
      'Lack of immediate symptoms does NOT mean your pet is out of danger; kidney markers peak at 24-72 hours.'
    ],
    recommendedAction: 'Immediate veterinary decontamination within 2 hours of ingestion is crucial to prevent irreversible kidney damage.',
    references: [
      { title: 'Tartaric Acid and Grape Toxicity', organization: 'American Veterinary Medical Association (AVMA)' },
      { title: 'Grape and Raisin Poisoning', organization: 'Pet Poison Helpline' }
    ]
  },
  {
    id: 'onions-garlic',
    name: 'Onions, Garlic, Leeks & Chives',
    scientificName: 'Allium spp.',
    category: 'food',
    aliases: ['onion', 'garlic', 'shallot', 'scallion', 'leek', 'chives', 'garlic powder', 'onion powder'],
    safetyDog: 'toxic',
    safetyCat: 'toxic',
    severity: 'severe',
    toxicCompounds: ['N-propyl disulfide', 'Thiosulfates'],
    dogSummary: 'Toxic in all forms (raw, cooked, dehydrated, powder). Oxidizes hemoglobin in red blood cells, forming Heinz bodies and causing severe hemolytic anemia.',
    catSummary: 'CATS ARE 2 TO 3 TIMES MORE SENSITIVE than dogs! Even tiny amounts of baby food or broth containing onion/garlic powder can destroy a cat’s red blood cells.',
    commonSymptoms: ['Pale or yellowish gums', 'Red or brown colored urine', 'Lethargy & weakness', 'Elevated respiratory rate', 'Vomiting', 'Collapse'],
    precautions: [
      'Powdered forms (garlic powder/onion powder) are concentrated and up to 5x more potent.',
      'Symptoms may take 2 to 4 days to become fully apparent.',
      'Check ingredient labels of broths, soups, and baby foods.'
    ],
    recommendedAction: 'Contact veterinarian. Blood work (complete blood count / Heinz body smear) is often required.',
    references: [
      { title: 'Allium Species Toxicosis', organization: 'Merck Veterinary Manual' }
    ]
  },
  {
    id: 'peanut-butter',
    name: 'Peanut Butter',
    category: 'food',
    aliases: ['peanut', 'peanuts', 'pb'],
    safetyDog: 'safe',
    safetyCat: 'safe',
    severity: 'none',
    dogSummary: 'Generally safe and loved by most dogs as a high-protein treat or pill pocket, BUT you MUST verify the label contains ZERO Xylitol (birch sugar). Feed in moderation due to high fat and calorie density.',
    catSummary: 'Generally non-toxic to cats in tiny tastes, but offer minimal amounts as it has no nutritional necessity for obligate carnivores and can present a sticky choking hazard.',
    precautions: [
      'MANDATORY: Check the ingredient list for Xylitol or Birch Sugar before serving.',
      'Avoid peanut butters with added sugars, artificial sweeteners, or hydrogenated oils.',
      'Dogs prone to pancreatitis should avoid high-fat foods like peanut butter.'
    ],
    recommendedAction: 'Serve 1/2 to 1 teaspoon occasionally as a treat or vehicle for medication. Ensure 100% roasted peanuts only.',
    safePreparationNotes: 'Choose 1-ingredient (pure peanuts) or standard brands with no xylitol.',
    references: [
      { title: 'Can Dogs Eat Peanut Butter?', organization: 'American Kennel Club (AKC)' }
    ]
  },
  {
    id: 'blueberries',
    name: 'Blueberries',
    scientificName: 'Vaccinium sect. Cyanococcus',
    category: 'food',
    aliases: ['blueberry', 'fresh blueberries', 'frozen blueberries'],
    safetyDog: 'safe',
    safetyCat: 'safe',
    severity: 'none',
    dogSummary: 'Nutritional superstar! Rich in antioxidants (anthocyanins), vitamin C, vitamin K, and fiber. Perfect low-calorie training reward.',
    catSummary: 'Safe for cats in small quantities. Many cat food manufacturers even include blueberries for antioxidants.',
    precautions: [
      'Wash thoroughly before feeding.',
      'Frozen blueberries can be a choking hazard for toy dog breeds—squish or thaw first.',
      'Treats should make up no more than 10% of total daily caloric intake.'
    ],
    recommendedAction: 'Safe to share fresh or frozen as a crunchy, refreshing treat.',
    references: [
      { title: 'Fruits Dogs Can Eat', organization: 'AKC Nutrition Guide' }
    ]
  },
  {
    id: 'apples',
    name: 'Apples (Flesh Only)',
    scientificName: 'Malus domestica',
    category: 'food',
    aliases: ['apple', 'apple slices'],
    safetyDog: 'safe',
    safetyCat: 'safe',
    severity: 'mild',
    dogSummary: 'Apple slices provide vitamins A and C and dietary fiber. Remove the core and all seeds, which contain amygdalin (cyanogenic glycoside) and present a choking hazard.',
    catSummary: 'Safe in tiny bites if your cat is curious, but cats lack sweet receptors and digest plant matter poorly.',
    precautions: [
      'Never feed the apple core or apple seeds.',
      'Cut into bite-sized wedges to prevent esophageal choking.'
    ],
    recommendedAction: 'Slice fresh apple into thin peeled or unpeeled wedges without seeds.',
    references: [
      { title: 'Safe Foods for Pets', organization: 'Humane Society of the United States' }
    ]
  },
  {
    id: 'cooked-bones',
    name: 'Cooked Bones (Chicken, Beef, Pork)',
    category: 'food',
    aliases: ['chicken bones', 'rib bones', 'steak bone', 'turkey bones'],
    safetyDog: 'toxic',
    safetyCat: 'toxic',
    severity: 'severe',
    dogSummary: 'Cooking makes bones brittle and prone to splintering into needle-sharp shards that can lacerate the esophagus, stomach, or cause life-threatening intestinal perforation / peritonitis.',
    catSummary: 'Cooked poultry bones splinter easily and can tear through a cat’s delicate mouth, throat, or intestines.',
    commonSymptoms: ['Choking / Gagging', 'Excessive drooling', 'Vomiting blood', 'Straining to defecate', 'Lethargy and tense abdominal pain'],
    precautions: [
      'Never give poultry, pork, or steak bones from cooked meals.',
      'Secure trash cans to prevent scavenging.'
    ],
    recommendedAction: 'If your pet swallowed cooked bones, monitor closely and contact your vet. High-fiber bread or canned pumpkin is sometimes recommended by vets to cushion sharp fragments.',
    references: [
      { title: 'The Dangers of Bones for Dogs', organization: 'FDA Consumer Health' }
    ]
  },
  {
    id: 'avocado',
    name: 'Avocado',
    scientificName: 'Persea americana',
    category: 'food',
    aliases: ['guacamole', 'avocado pit', 'avocado skin'],
    safetyDog: 'caution',
    safetyCat: 'caution',
    severity: 'moderate',
    toxicCompounds: ['Persin (fungicidal toxin)', 'High Fat Content'],
    dogSummary: 'While persin is primarily toxic to birds and livestock, the avocado pit is a notorious gastrointestinal foreign body that frequently requires emergency surgery. The high fat content can also trigger acute pancreatitis in dogs.',
    catSummary: 'Persin can cause gastrointestinal upset (vomiting, diarrhea) in cats, and the high fat is unsuitable for feline digestive systems.',
    commonSymptoms: ['Vomiting', 'Diarrhea', 'Abdominal tenderness', 'Choking or intestinal blockage if pit is ingested'],
    precautions: [
      'Keep avocado pits completely away from dogs—they are slippery and easily swallowed whole.',
      'Guacamole frequently contains onions, garlic, and salt, making it toxic.'
    ],
    recommendedAction: 'Do not deliberately feed avocado. If pit is swallowed, seek emergency vet care immediately for obstruction assessment.',
    references: [
      { title: 'Avocado Toxicity in Pets', organization: 'Pet Poison Helpline' }
    ]
  },
  {
    id: 'macadamia-nuts',
    name: 'Macadamia Nuts',
    scientificName: 'Macadamia integrifolia',
    category: 'food',
    aliases: ['macadamia', 'australian nut', 'queensland nut'],
    safetyDog: 'toxic',
    safetyCat: 'caution',
    severity: 'severe',
    toxicCompounds: ['Unidentified toxic mechanism specific to canines'],
    dogSummary: 'One of the top canine toxins. Ingestion causes dramatic rear limb weakness, tremors, hyperthermia (high fever), vomiting, and inability to stand within 12 hours.',
    catSummary: 'Specific toxicity has not been documented in cats to the same extent, but high fat poses a significant risk of pancreatitis and GI upset.',
    commonSymptoms: ['Hind limb weakness / ataxia', 'Depression / lethargy', 'Vomiting', 'Elevated body temperature', 'Joint stiffness / tremors'],
    precautions: [
      'Keep baked cookies, trail mixes, and nuts securely stored.',
      'Even chocolate-covered macadamias multiply the toxic threat exponentially.'
    ],
    recommendedAction: 'Contact vet or poison control promptly. Supportive care and symptom management lead to full recovery in most treated dogs within 24–48 hours.',
    references: [
      { title: 'Macadamia Nut Toxicosis in Dogs', organization: 'Merck Veterinary Manual' }
    ]
  },
  {
    id: 'dairy-cheese-milk',
    name: 'Cheese, Milk & Dairy',
    category: 'food',
    aliases: ['milk', 'cheese', 'cheddar', 'ice cream', 'yogurt', 'cow milk'],
    safetyDog: 'caution',
    safetyCat: 'caution',
    severity: 'mild',
    dogSummary: 'Most adult dogs lack significant levels of the lactase enzyme. High quantities of milk or cheese lead to loose stools, gas, and abdominal pain. Small bits of low-lactose cheese (cheddar/mozzarella) are safe for medication hiding if tolerated.',
    catSummary: 'Despite pop-culture myths, most adult cats are lactose intolerant. Cow’s milk causes diarrhea, dehydration, and cramping. Avoid regular milk and dairy bowls.',
    commonSymptoms: ['Diarrhea', 'Flatulence', 'Vomiting', 'Stomach rumbling'],
    precautions: [
      'Never feed blue cheese (contains Roquefortine C, which is toxic to dogs).',
      'Never feed sugar-free or artificially sweetened yogurt/ice cream.'
    ],
    recommendedAction: 'Use tiny slivers of low-fat cheese strictly for pills, or choose lactose-free pet formulated milk.',
    references: [
      { title: 'Can Dogs & Cats Drink Milk?', organization: 'Cornell University Feline Health Center' }
    ]
  },
  {
    id: 'raw-dough',
    name: 'Raw Bread Yeast Dough',
    category: 'food',
    aliases: ['bread dough', 'yeast dough', 'pizza dough', 'baking yeast'],
    safetyDog: 'toxic',
    safetyCat: 'toxic',
    severity: 'severe',
    toxicCompounds: ['Ethanol (Alcohol)', 'Carbon dioxide gas expansion'],
    dogSummary: 'DOUBLE THREAT: Inside a pet’s warm, moist stomach, live yeast continues to ferment and expand rapidly, creating massive gastric distension or deadly bloat (GDV). Fermentation byproduct is alcohol, causing severe ethanol toxicosis.',
    catSummary: 'Equal physiological danger in cats—severe gastric distension, breathing restriction, and alcohol poisoning.',
    commonSymptoms: ['Distended, bloated abdomen', 'Retching without vomit', 'Disorientation / drunk gait', 'Hypothermia', 'Hypoglycemia', 'Seizures'],
    precautions: [
      'Keep rising bread dough strictly out of reach on high countertops.'
    ],
    recommendedAction: 'LIFE-THREATENING EMERGENCY. Go straight to an emergency animal clinic. Cold water gastric lavage may be needed.',
    references: [
      { title: 'Bread Dough Toxicosis in Animals', organization: 'Merck Veterinary Manual' }
    ]
  },
  {
    id: 'carrots',
    name: 'Carrots',
    scientificName: 'Daucus carota',
    category: 'food',
    aliases: ['carrot', 'baby carrots', 'raw carrot'],
    safetyDog: 'safe',
    safetyCat: 'safe',
    severity: 'none',
    dogSummary: 'Excellent, nutritious, low-calorie treat. High in beta-carotene, vitamin A, potassium, and fiber. Chewing raw carrots helps gently clean dog teeth.',
    catSummary: 'Safe when cooked soft and cut into tiny bites, though cats derive fewer nutritional benefits than dogs.',
    precautions: [
      'Cut whole carrots into rounds or sticks for small dogs to prevent choking.'
    ],
    recommendedAction: 'Serve raw, steamed, or puréed with no added butter, salt, or seasonings.',
    references: [
      { title: 'Healthy Snacks for Dogs', organization: 'AKC Nutrition' }
    ]
  },
  {
    id: 'cooked-pumpkin',
    name: 'Plain Canned Pumpkin',
    scientificName: 'Cucurbita pepo',
    category: 'food',
    aliases: ['pumpkin', 'canned pumpkin', 'pure pumpkin puree'],
    safetyDog: 'safe',
    safetyCat: 'safe',
    severity: 'none',
    dogSummary: 'Veterinary gold standard for digestive health! Soluble fiber absorbs excess water for diarrhea and provides bulk for mild constipation.',
    catSummary: 'Extremely beneficial for cats suffering from hairballs or mild constipation. Mix 1/2 teaspoon into wet food.',
    precautions: [
      'MUST be 100% pure pumpkin puree—NEVER pumpkin pie mix, which contains nutmeg, cloves, and sugar.',
      'Do not feed raw pumpkin rind or stem.'
    ],
    recommendedAction: 'Add 1 tsp (small pets) to 1-2 tbsp (large dogs) to regular food as a fiber booster.',
    references: [
      { title: 'Pumpkin for Pet Digestion', organization: 'Veterinary Partner / VIN' }
    ]
  },
  {
    id: 'caffeine-coffee',
    name: 'Coffee, Tea & Caffeine',
    category: 'food',
    aliases: ['coffee', 'espresso', 'energy drink', 'black tea', 'coffee beans', 'coffee grounds'],
    safetyDog: 'toxic',
    safetyCat: 'toxic',
    severity: 'severe',
    toxicCompounds: ['Caffeine (Methylxanthine)'],
    dogSummary: 'Canines are significantly more sensitive to caffeine than humans. Ingesting coffee grounds, diet pills, or energy drinks causes dangerous hypertension, tachycardia, and cardiac arrhythmias.',
    catSummary: 'Equally toxic to cats. Ingestion of tea bags, espresso, or caffeinated supplements can cause severe heart complications and collapse.',
    commonSymptoms: ['Restlessness', 'Panting', 'Hyperactivity', 'Cardiac arrhythmias', 'High blood pressure', 'Tremors', 'Seizures'],
    precautions: [
      'Used coffee grounds in kitchen compost or trash are heavily concentrated.',
      'Energy drink and caffeine pill ingestions are critical emergencies.'
    ],
    recommendedAction: 'Immediate veterinary care for heart monitoring and decontamination.',
    references: [
      { title: 'Caffeine Toxicity', organization: 'Pet Poison Helpline' }
    ]
  },

  // ================= PLANTS & FLOWERS =================
  {
    id: 'lilies',
    name: 'True Lilies (Easter, Tiger, Asiatic, Stargazer, Daylilies)',
    scientificName: 'Lilium spp. & Hemerocallis spp.',
    category: 'plant',
    aliases: ['lily', 'easter lily', 'tiger lily', 'asiatic lily', 'daylily', 'stargazer lily', 'japanese show lily', 'rubrum lily'],
    safetyDog: 'caution',
    safetyCat: 'toxic',
    severity: 'fatal',
    toxicCompounds: ['Unidentified water-soluble nephrotoxin (lethal to felines)'],
    dogSummary: 'Generally causes mild stomach upset (vomiting, drooling) in dogs. Not fatal to canines, unlike cats.',
    catSummary: '100% FATAL WITHOUT IMMEDIATE AGGRESSIVE CARE! Even microscopic exposure—licking pollen off their fur, biting one petal, or drinking water from the vase—triggers acute, irreversible renal tubular necrosis within 24–72 hours.',
    commonSymptoms: ['Vomiting within 1–3 hours', 'Extreme lethargy', 'Loss of appetite', 'Dehydration', 'Complete kidney failure / zero urine output (anuria) within 36–72 hours'],
    precautions: [
      'NEVER keep true lilies in a home with cats under any circumstance.',
      'Check all floral bouquets delivered to your home immediately and discard all lilies.',
      'Do not delay! Once kidney failure establishes (after 18-24 hours), mortality is near 100%.'
    ],
    recommendedAction: 'CRITICAL FELINE EMERGENCY. Wash any pollen off fur immediately. Rush to emergency vet for 48 hours of IV fluid diuresis.',
    references: [
      { title: 'Lily Toxicity in Cats', organization: 'FDA Center for Veterinary Medicine', url: 'https://www.fda.gov' },
      { title: 'Cat-Friendly Homes: The Lily Danger', organization: 'American Association of Feline Practitioners (AAFP)' }
    ]
  },
  {
    id: 'sago-palm',
    name: 'Sago Palm (Cycad)',
    scientificName: 'Cycas revoluta',
    category: 'plant',
    aliases: ['sago', 'cycad', 'king sago', 'japanese sago', 'coontie palm', 'cardboard palm'],
    safetyDog: 'toxic',
    safetyCat: 'toxic',
    severity: 'fatal',
    toxicCompounds: ['Cycasin', 'Beta-methylamino-L-alanine (BMAA)'],
    dogSummary: 'ONE OF THE DEADLIEST PLANTS FOR DOGS. Every part is poisonous, but the seeds/nuts contain the highest concentration of cycasin. Ingestion causes acute fulminant hepatic necrosis (liver failure), bleeding disorders, and death in 50% of cases even with treatment.',
    catSummary: 'Equally toxic and fatal to cats if chewed.',
    commonSymptoms: ['Vomiting (often bloody) within 15 mins to 24 hrs', 'Bloody diarrhea (melena)', 'Extreme weakness', 'Bleeding disorders / bruising', 'Jaundice', 'Seizures', 'Liver failure'],
    precautions: [
      'Popular landscaping ornamental in southern US states (FL, TX, CA, GA, NC, AZ).',
      'Remove sago palms from your yard if you have pets.'
    ],
    recommendedAction: 'CODE RED EMERGENCY. Immediate aggressive veterinary decontamination and liver protectants required within the hour.',
    references: [
      { title: 'Sago Palm Toxicity', organization: 'Pet Poison Helpline' },
      { title: 'Cycasin Toxicosis', organization: 'Merck Veterinary Manual' }
    ]
  },
  {
    id: 'poinsettia',
    name: 'Poinsettia',
    scientificName: 'Euphorbia pulcherrima',
    category: 'plant',
    aliases: ['christmas plant', 'mexican flame leaf', 'winter rose'],
    safetyDog: 'caution',
    safetyCat: 'caution',
    severity: 'mild',
    toxicCompounds: ['Diterpenoid euphorbol esters & sap'],
    dogSummary: 'Commonly thought to be deadly, but poinsettias are actually only mildly toxic. The milky sap is an irritant to mouth and stomach, causing mild drooling, nausea, or vomiting.',
    catSummary: 'Causes mild mouth irritation, pawing at the mouth, drooling, and possible mild vomiting. Rarely requires medical intervention.',
    commonSymptoms: ['Drooling', 'Mouth pawing', 'Mild vomiting', 'Skin redness/itching if sap contacts fur'],
    precautions: [
      'Keep holiday bouquets out of pet reach, but do not panic if small nibbles occur.'
    ],
    recommendedAction: 'Offer fresh water or rinse the mouth gently. Call vet if vomiting persists for more than a few hours.',
    references: [
      { title: 'Poinsettia Toxicity Truths', organization: 'ASPCA Animal Poison Control' }
    ]
  },
  {
    id: 'tulips-daffodils',
    name: 'Tulips & Daffodils',
    scientificName: 'Tulipa spp. & Narcissus spp.',
    category: 'plant',
    aliases: ['tulip', 'daffodil', 'jonquil', 'narcissus'],
    safetyDog: 'toxic',
    safetyCat: 'toxic',
    severity: 'moderate',
    toxicCompounds: ['Tulipalin A and B', 'Lycorine (phenanthridine alkaloid)'],
    dogSummary: 'The bulbs contain the highest concentration of toxins. Ingesting bulbs causes intense oral irritation, profuse drooling, severe vomiting, diarrhea, tremors, and cardiac arrhythmias.',
    catSummary: 'Cats chewing leaves or digging up bulbs can experience severe GI irritation, drop in blood pressure, and tremors.',
    commonSymptoms: ['Intense salivation / drooling', 'Vomiting', 'Diarrhea', 'Cardiac arrhythmias', 'Difficulty breathing if bulb pieces obstruct throat'],
    precautions: [
      'Keep unplanted spring bulbs secured in pet-free garden sheds.',
      'Fence off newly planted garden beds.'
    ],
    recommendedAction: 'Contact veterinarian promptly, especially if bulbs were chewed or consumed.',
    references: [
      { title: 'Spring Plant Hazards', organization: 'ASPCA Animal Poison Control' }
    ]
  },
  {
    id: 'aloe-vera',
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis',
    category: 'plant',
    aliases: ['aloe', 'burn plant', 'aloe gel plant'],
    safetyDog: 'caution',
    safetyCat: 'caution',
    severity: 'moderate',
    toxicCompounds: ['Aloin', 'Anthraquinone glycosides (saponins)'],
    dogSummary: 'While the inner clear gel is soothing on skin, the thick green outer rind contains saponins and aloin that irritate the stomach lining and cause watery diarrhea and lethargy.',
    catSummary: 'Chewing the succulent leaf induces vomiting, cramping, diarrhea, and reddish-colored urine.',
    commonSymptoms: ['Vomiting', 'Diarrhea', 'Anorexia', 'Tremors', 'Reddish urine'],
    precautions: [
      'Keep potted aloe plants on elevated shelves out of reach of curious cats and puppies.'
    ],
    recommendedAction: 'Consult veterinarian if multiple leaves were chewed or pet exhibits persistent diarrhea.',
    references: [
      { title: 'Toxic and Non-Toxic Plants', organization: 'ASPCA' }
    ]
  },
  {
    id: 'pothos-philodendron',
    name: 'Pothos & Philodendron',
    scientificName: 'Epipremnum aureum & Philodendron spp.',
    category: 'plant',
    aliases: ['devils ivy', 'golden pothos', 'heartleaf philodendron', 'swiss cheese plant (monstera)'],
    safetyDog: 'toxic',
    safetyCat: 'toxic',
    severity: 'moderate',
    toxicCompounds: ['Insoluble Calcium Oxalate Crystals (Raphides)'],
    dogSummary: 'Chewing leaves releases microscopic needle-sharp calcium oxalate crystals that embed into the oral mucosa and tongue, causing intense burning pain, swelling, and drooling.',
    catSummary: 'Very common houseplant emergency for cats. Causes severe mouth pawing, excessive hypersalivation, swollen tongue, and occasional difficulty breathing.',
    commonSymptoms: ['Oral pain & vocalizing', 'Hypersalivation (foaming / drooling)', 'Pawing at mouth', 'Vomiting', 'Difficulty swallowing'],
    precautions: [
      'Hang trailing pothos vines high where jumping pets cannot swat or chew them.'
    ],
    recommendedAction: 'Offer cold water, ice cubes, or a small amount of lactose-free milk/tuna juice to soothe oral mucous membranes. Contact vet if airway appears compromised.',
    references: [
      { title: 'Insoluble Calcium Oxalates in Plants', organization: 'Pet Poison Helpline' }
    ]
  },
  {
    id: 'spider-plant',
    name: 'Spider Plant',
    scientificName: 'Chlorophytum comosum',
    category: 'plant',
    aliases: ['airplane plant', 'ribbon plant'],
    safetyDog: 'safe',
    safetyCat: 'safe',
    severity: 'none',
    dogSummary: '100% non-toxic to dogs. A completely safe houseplant.',
    catSummary: 'Non-toxic to cats! Cats love batting at the baby spiderettes. Note: Spider plant contains mild compounds with a subtle hallucinogenic effect on cats similar to catnip, which may cause cats to obsessively chew it.',
    precautions: [
      'Eating large volumes of any plant matter can still cause mild mechanical stomach upset.'
    ],
    recommendedAction: 'Safe to keep freely around cats and dogs.',
    references: [
      { title: 'Non-Toxic Plants for Cats and Dogs', organization: 'ASPCA' }
    ]
  },
  {
    id: 'catnip',
    name: 'Catnip',
    scientificName: 'Nepeta cataria',
    category: 'plant',
    aliases: ['catmint', 'catswort', 'field balm'],
    safetyDog: 'safe',
    safetyCat: 'safe',
    severity: 'none',
    dogSummary: 'Safe for dogs. While it acts as a stimulant in cats, catnip actually acts as a mild calming relaxant/sedative in dogs.',
    catSummary: 'Safe, fun, and non-addictive! Contains nepetalactone, which triggers pheromone receptors in 70% of domestic cats, causing playful euphoria.',
    precautions: [
      'Excessive consumption can cause mild gastrointestinal upset (vomiting/diarrhea).'
    ],
    recommendedAction: 'Safe to offer as dry flakes, fresh leaves, or inside toys.',
    references: [
      { title: 'Catnip and Pet Safety', organization: 'Cornell Feline Health Center' }
    ]
  },

  // ================= HOUSEHOLD & MEDICATIONS =================
  {
    id: 'acetaminophen',
    name: 'Acetaminophen (Tylenol)',
    scientificName: 'Paracetamol / N-acetyl-p-aminophenol',
    category: 'medication',
    aliases: ['tylenol', 'paracetamol', 'mapap', 'fever reducer', 'cold medicine'],
    safetyDog: 'toxic',
    safetyCat: 'toxic',
    severity: 'fatal',
    toxicCompounds: ['NAPQI toxic metabolite'],
    dogSummary: 'Causes severe liver damage, dry eye (KCS), and methemoglobinemia at elevated doses. Never administer human pain relievers to dogs.',
    catSummary: 'LETHAL POISON FOR CATS! Cats lack the glucuronyl transferase enzyme needed to detoxify acetaminophen. Even a single 160mg children’s tablet causes fatal methemoglobinemia (inability of blood to carry oxygen), suffocation, brown blood, and death within hours.',
    commonSymptoms: ['Brown/cyanotic (chocolate-colored) gums', 'Rapid, labored breathing', 'Facial swelling', 'Hypothermia', 'Vomiting', 'Collapse'],
    precautions: [
      'NEVER, UNDER ANY CIRCUMSTANCES, GIVE TYLENOL TO A CAT OR DOG.',
      'Store all human pain medications in high, child-proof cabinets.'
    ],
    recommendedAction: 'ABSOLUTE LIFE-THREATENING EMERGENCY. Rush immediately to nearest vet for antidote: N-acetylcysteine (NAC) and oxygen therapy.',
    references: [
      { title: 'Acetaminophen Toxicosis in Cats and Dogs', organization: 'Merck Veterinary Manual' }
    ]
  },
  {
    id: 'ibuprofen-advil',
    name: 'Ibuprofen (Advil, Motrin)',
    scientificName: 'Ibuprofen (NSAID)',
    category: 'medication',
    aliases: ['advil', 'motrin', 'nuprin', 'nsaid'],
    safetyDog: 'toxic',
    safetyCat: 'toxic',
    severity: 'fatal',
    toxicCompounds: ['Ibuprofen'],
    dogSummary: 'Extremely narrow margin of safety. Blocks protective prostaglandins in the canine stomach and kidneys, causing perforating gastric ulcers, intestinal bleeding, and acute renal failure within 12-24 hours.',
    catSummary: 'Cats are even more vulnerable than dogs to NSAID toxicosis and renal shutdown.',
    commonSymptoms: ['Vomiting blood (coffee-ground appearance)', 'Black tarry stools (melena)', 'Abdominal pain', 'Lethargy', 'Stupor / coma'],
    precautions: [
      'Many ibuprofen tablets have a sweet sugary outer coating that dogs eagerly crunch.'
    ],
    recommendedAction: 'Immediate emergency veterinary clinic visit for IV fluid diuresis, GI protectants, and activated charcoal.',
    references: [
      { title: 'Ibuprofen Ingestion in Small Animals', organization: 'Pet Poison Helpline' }
    ]
  },
  {
    id: 'essential-oils',
    name: 'Essential Oils (Tea Tree, Eucalyptus, Citrus, Peppermint)',
    category: 'household',
    aliases: ['tea tree oil', 'melaleuca', 'eucalyptus oil', 'peppermint oil', 'wintergreen oil', 'cinnamon oil', 'diffuser oil'],
    safetyDog: 'caution',
    safetyCat: 'toxic',
    severity: 'severe',
    toxicCompounds: ['Terpenes', 'Phenols', 'Ketones'],
    dogSummary: 'Concentrated 100% oils on skin or ingested cause neurological depression, muscle weakness, and hypothermia.',
    catSummary: 'VERY TOXIC TO CATS. Felines lack liver glucuronidation enzymes required to break down hydrocarbons and terpenes. Active ultrasonic diffusers in enclosed spaces can cause respiratory distress, asthma attacks, and liver failure.',
    commonSymptoms: ['Drooling', 'Unsteady walk / stumbling', 'Coughing & wheezing', 'Lethargy', 'Low heart rate / hypothermia', 'Tremors'],
    precautions: [
      'Do not run strong essential oil diffusers in closed rooms where cats sleep.',
      'Never apply undiluted essential oils to pet fur or skin as flea remedies.'
    ],
    recommendedAction: 'Move pet to fresh air immediately. Wash skin with mild dish soap if exposed topically. Contact vet.',
    references: [
      { title: 'Essential Oils and Dogs / Cats', organization: 'ASPCA Animal Poison Control' }
    ]
  },
  {
    id: 'rodenticide-rat-poison',
    name: 'Rodenticides (Rat & Mouse Bait)',
    category: 'household',
    aliases: ['rat poison', 'mouse bait', 'd-con', 'bromethalin', 'brodifacoum', 'cholecalciferol'],
    safetyDog: 'toxic',
    safetyCat: 'toxic',
    severity: 'fatal',
    toxicCompounds: ['Anticoagulants (Brodifacoum/Warfarin)', 'Bromethalin (Neurotoxin)', 'Cholecalciferol (Vitamin D3)'],
    dogSummary: 'HIGHLY DEADLY. Flavored with grain and peanut scents that dogs eagerly eat. Anticoagulants cause massive internal hemorrhaging within 3 to 7 days. Bromethalin causes fatal brain swelling.',
    catSummary: 'Direct bait ingestion or eating poisoned rodents (secondary relay toxicosis) is equally fatal.',
    commonSymptoms: ['Spontaneous bleeding (nose, gums, stool)', 'Coughing blood', 'Bruising on skin', 'Extreme lethargy', 'Pale gums', 'Seizures'],
    precautions: [
      'Never place rodent bait anywhere pets or wildlife could ever reach.',
      'Keep the original box/EPA registration number to show the emergency vet.'
    ],
    recommendedAction: 'RUSH TO EMERGENCY VET IMMEDIATELY. Bring the bait packaging so the vet knows whether to administer Vitamin K1 or treat for neurotoxins.',
    references: [
      { title: 'Rodenticide Ingestion Protocols', organization: 'Merck Veterinary Manual' }
    ]
  },
  {
    id: 'antifreeze-ethylene-glycol',
    name: 'Antifreeze (Ethylene Glycol)',
    category: 'household',
    aliases: ['ethylene glycol', 'coolant', 'radiator fluid', 'windshield wiper fluid'],
    safetyDog: 'toxic',
    safetyCat: 'toxic',
    severity: 'fatal',
    toxicCompounds: ['Ethylene glycol metabolites (Glycolic acid, Calcium oxalate)'],
    dogSummary: 'One of the most dangerous automotive poisons. Ethylene glycol has an enticing sweet taste. Metabolizes into oxalic acid, which crystallizes inside renal tubules and destroys both kidneys completely within 12–24 hours.',
    catSummary: 'Cats only need 1/2 teaspoon to suffer fatal, irreversible acute kidney failure.',
    commonSymptoms: ['Stage 1 (1–6 hrs): Drunken gait, nausea, excessive thirst and urination', 'Stage 2 (6–12 hrs): Rapid heart rate and breathing', 'Stage 3 (12–24 hrs): Complete kidney failure, seizures, coma, death'],
    precautions: [
      'Clean up garage driveway spills immediately.',
      'Choose non-toxic pet-safe propylene glycol based coolants.'
    ],
    recommendedAction: 'LIFE OR DEATH EMERGENCY. The antidote (Fomepizole / 4-MP) must be administered within 3 hours for cats and 6 hours for dogs.',
    references: [
      { title: 'Ethylene Glycol Poisoning in Small Animals', organization: 'ASPCA Animal Poison Control' }
    ]
  }
];
