import { useEffect, useState } from "react";
import jsPDF from "jspdf";

/* ---------- Types ---------- */
interface Profile {
  name: string;
  role: string;
  experience: number;
  skills: string[];
}

/* ---------- Constants ---------- */
const STORAGE_KEY = "profileData";

const INITIAL_JSON: Profile = {
  name: "Dipak Jagtap",
  role: "Frontend Developer",
  experience: 4,
  skills: ["React", "Angular", "TypeScript"]
};

/* ---------- Component ---------- */
export default function ProfileEditor() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    experience: "",
    skills: ""
  });

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  /* ---------- Load JSON → localStorage → State ---------- */
  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_JSON));
    }

    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY)!
    ) as Profile;

    setForm({
      name: stored.name,
      role: stored.role,
      experience: stored.experience.toString(),
      skills: stored.skills.join(", ")
    });
  }, []);

  /* ---------- Handlers ---------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    const updated: Profile = {
      name: form.name,
      role: form.role,
      experience: Number(form.experience),
      skills: form.skills.split(",").map(s => s.trim())
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    alert("Profile saved");
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Profile Summary", 10, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${form.name}`, 10, 40);
    doc.text(`Role: ${form.role}`, 10, 55);
    doc.text(`Experience: ${form.experience} years`, 10, 70);
    doc.text(`Skills: ${form.skills}`, 10, 85);

    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  /* ---------- UI ---------- */
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden"
      }}
    >
      {/* ================= LEFT: EDITOR (50%) ================= */}
      <div
        style={{
          width: "50%",
          padding: "24px",
          boxSizing: "border-box",
          overflowY: "auto",
          borderRight: "1px solid #ddd"
        }}
      >
        <h2>Edit Profile</h2>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 12 }}
        />

        <input
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 12 }}
        />

        <input
          name="experience"
          placeholder="Experience"
          value={form.experience}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 12 }}
        />

        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 20 }}
        />

        <button onClick={saveProfile}>Save</button>
        <button
          onClick={generatePDF}
          style={{ marginLeft: 10 }}
        >
          Generate PDF
        </button>
      </div>

      {/* ================= RIGHT: PDF VIEWER (50%) ================= */}
      <div
        style={{
          width: "50%",
          height: "100%",
          padding: "12px",
          boxSizing: "border-box",
          background: "#f5f5f5"
        }}
      >
        <h2>PDF Preview</h2>

        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            style={{
              width: "100%",
              height: "calc(100% - 40px)",
              border: "none",
              background: "#fff"
            }}
          />
        ) : (
          <p>No PDF generated yet</p>
        )}
      </div>
    </div>
  );
}
