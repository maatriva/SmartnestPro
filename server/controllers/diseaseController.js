import db from '../db.js';

export const getDiseases = async (req, res) => {
  try {
    const query = `
      SELECT 
        c.name as category, 
        d.name, 
        d.key_parameters as description, 
        d.smartnest_help as "aiRole"
      FROM diseases d
      JOIN subcategories s ON d.subcategory_id = s.id
      JOIN categories c ON s.category_id = c.id
    `;
    const { rows } = await db.query(query);

    // Group by category
    const groupedData = rows.reduce((acc, row) => {
      let category = acc.find(c => c.category === row.category);
      if (!category) {
        category = { category: row.category, diseases: [] };
        acc.push(category);
      }
      category.diseases.push({
        name: row.name,
        description: row.description,
        aiRole: row.aiRole
      });
      return acc;
    }, []);

    res.status(200).json(groupedData);
  } catch (error) {
    console.error('Error fetching diseases:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
