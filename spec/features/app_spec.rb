describe "TB Mobile application" do
  it "sets the page title" do
    visit "/login"

    expect(page.title).to eq("TB Asistente Diario")
  end
end
