const App = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = e.target.image.files[0];

    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "random123"); 
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dcnjyz91w/image/upload", 
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Uploaded:", data);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="file" name="image" className="file-input" />
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
};

export default App;
