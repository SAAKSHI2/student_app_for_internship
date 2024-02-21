import axios from "axios";
import cheerio from "cheerio";
import Internships from "../models/Internships.js";

export const scrapeInternshala = async() => {
  const url = 'https://internshala.com/internships';
  console.log("enter scrape");

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const internships = [];

    $('div.individual_internship').each(async(index, element) => {
      const roleName = $(element).find('.profile a').text().trim();
      const companyName = $(element).find('a.link_display_like_text').text().trim();
      const location = $(element).find('a.location_link').text().trim();
      const stipend = $(element).find('span.stipend').text().trim();
      const companyLogo = $(element).find('.internship_logo img').attr("src");
      const start_date = $(element).find('.start_immediately_desktop').text().trim();

      const internshipData = { roleName, companyName, location, stipend, companyLogo, start_date };

      // Check if the internship already exists in the database
      const existingInternship = await Internships.findOne(internshipData);

      if (!existingInternship) {
        // If not, save it to the database
        const newInternship = new Internships(internshipData);
        await newInternship.save();
        internships.push(internshipData);
      }

      if (internships.length === 5) {
        return false; // Break the loop once you have 100 internships
      }
    });

    return internships;
    
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}


// export default scrapeInternshala;