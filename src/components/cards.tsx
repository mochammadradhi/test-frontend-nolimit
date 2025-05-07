// Membuat component cards dan pass props untuk reusable components sesuai kebutuhan

interface SectionCardsProps {
  children: React.ReactNode;
}

const SectionCards = ({ children }: SectionCardsProps) => {
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {children}
    </div>
  );
};

export default SectionCards;
