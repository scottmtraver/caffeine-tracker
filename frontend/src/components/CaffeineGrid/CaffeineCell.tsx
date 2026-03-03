interface CaffeineCellProps {
  amount: number
  onClick: () => void
}

function getCellStyle(amount: number): { backgroundColor: string; color: string } {
  if (amount === 0) return { backgroundColor: '#EBEDF0', color: 'transparent' }
  if (amount < 75) return { backgroundColor: '#9BE9A8', color: '#166534' }
  if (amount < 150) return { backgroundColor: '#40C463', color: '#ffffff' }
  if (amount < 250) return { backgroundColor: '#30A14E', color: '#ffffff' }
  return { backgroundColor: '#216E39', color: '#ffffff' }
}

export default function CaffeineCell({ amount, onClick }: CaffeineCellProps) {
  const style = getCellStyle(amount)

  return (
    <div
      onClick={onClick}
      style={{
        aspectRatio: '1 / 1',
        borderRadius: '3px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        fontWeight: 500,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
        backgroundColor: style.backgroundColor,
        color: style.color,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        e.currentTarget.style.zIndex = '10'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = ''
        e.currentTarget.style.zIndex = ''
      }}
    >
      {amount}
    </div>
  )
}
