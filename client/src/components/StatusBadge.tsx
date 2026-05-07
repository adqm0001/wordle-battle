interface StatusProps {
  status: 'waiting' | 'playing' | 'finished'
}
function StatusBadge({status}: StatusProps) {
  const classMap = {
    waiting: 'badgeWaiting',
    playing: 'badgePlaying',
    finished: 'badgeFinished'
  };

  return (
    <div className = 'statusBadge'>
      <span className = {classMap[status]}>{status}</span>
    </div>
    )
}

export default StatusBadge;
