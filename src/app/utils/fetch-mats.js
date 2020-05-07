const tools = ['Blacksmith Hammer', 'Mining Pick', 'Arclight Spanner', 'Skinning Knife', 'Gyromatic Micro-Adjustor'];

export default (id, type = 'spell') => {
  return fetch(`https://classic.wowhead.com/tooltip/${ type }/${ id }`)
    .then(response => response.json())
    .then((data) => {
      const html = document.createElement('div');
      html.innerHTML = data.tooltip;

      const reagents = Array
        .from(html.querySelectorAll('td>.indent.q1 a'))
        .filter((a) => {
          return tools.reduce(
            (acc, curr) => {
              if (!acc) {
                return acc;
              }

              return a.innerHTML.indexOf(curr) === -1;
            },
            true,
          );
        })
        .map((a) => {
          const id = a.getAttribute('href')?.replace('/item=', '');
          const match = a.nextSibling?.data?.match(/\d+/g);
          if (id) {
            return [id, match && match.length ? +match[0] : 1];
          }
        });

      return reagents.reduce(
        (acc, curr) => {
          const [id, amount] = curr;
          acc[id] = amount;
          return acc;
        },
        {},
      );
    });
};