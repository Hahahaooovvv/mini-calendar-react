import MiniCalendar from '@/component/miniCalendar';
import yayJpg from '../assets/yay.jpg';

export default function HomePage() {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: "80%", margin: "auto" }} >
        <MiniCalendar />
      </div>
      <div style={{ width: "50%", margin: "auto", marginTop: 200 }} >
        <MiniCalendar />
      </div>
    </div>
  );
}
