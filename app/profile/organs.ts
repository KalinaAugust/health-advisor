export interface Organ {
  id: string;
  title: string;
  icon: string;
  description: string;
  status: 'ok' | 'warning' | 'critical';
}

export const organs: Organ[] = [
  // { id: "stomach", title: "Stomach", icon: "/icons/stomach.png", description: "Your stomach health indicators are within normal range, digestion is proceeding efficiently, and acid levels are well-balanced with no signs of inflammation or irritation detected.", status: "warning" },
  { id: "knee", title: "Knee", icon: "/icons/knee.png", description: "Joint mobility and cartilage condition appear stable, synovial fluid levels are adequate, and no signs of wear or early degenerative changes have been observed in recent assessments.", status: "warning" },
  { id: "brain", title: "Brain", icon: "/icons/brain.png", description: "Cognitive function markers show no signs of concern, neural activity patterns are within expected ranges, and memory consolidation along with focus metrics remain consistently healthy.", status: "critical" },
  { id: "bladder", title: "Bladder", icon: "/icons/bladder.png", description: "Urinary tract function is operating as expected, bladder capacity and muscle tone are normal, and there are no indicators of infection or structural irregularities present.", status: "ok" },
  { id: "liver", title: "Liver", icon: "/icons/liver.png", description: "Liver enzyme levels are within the healthy reference range, detoxification processes are functioning optimally, and bile production supports healthy fat metabolism without any anomalies.", status: "critical" },
  // { id: "kidneys", title: "Kidneys", icon: "/icons/kidneys.png", description: "Kidney filtration rate is at a healthy level, electrolyte balance is well-maintained, and waste removal efficiency is performing as expected with no signs of reduced function.", status: "warning" },
  { id: "heart", title: "Heart", icon: "/icons/heart.png", description: "Cardiovascular indicators suggest good overall heart health, resting heart rate and rhythm are stable, and blood pressure readings remain consistently within the optimal range.", status: "ok" },
  { id: "intestines", title: "Intestines", icon: "/icons/intestines.png", description: "Digestive system activity appears balanced and regular, microbiome diversity is at a healthy level, and nutrient absorption efficiency shows no signs of inflammation or obstruction.", status: "critical" },
  { id: "lungs", title: "Lungs", icon: "/icons/lungs.png", description: "Respiratory capacity and oxygen exchange are functioning well, lung volume measurements are within normal parameters, and airway resistance shows no signs of chronic or acute issues.", status: "warning" },
  { id: "hemoglobin", title: "Hemoglobin", icon: "/icons/hemoglobin.png", description: "Blood hemoglobin levels are within the recommended range, red blood cell count is adequate for efficient oxygen transport, and iron saturation remains stable with no signs of anemia.", status: "warning" },
];
