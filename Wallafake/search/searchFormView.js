export const buildSearchForm = () => {
  return `
      <h4 class="form-title">Search</h4>
      <div class="form-rows">
        <div class="form-row">
          <label class="form-label" for="productName">
          Product Name (Exact Name)</label
          >
          <input
          class="form-input"
              type="text"
              id="productName"
              name="name"
              minlength="3"
              value="any"
              autocomplete="true"
            />
        </div>
        <div class="form-row">
          <label class="form-label" for="search-type"> For </label>
          <select id="search-type" name="for" class="form-input">
            <option value="all">All</option>
            <option value="On Sale">Sell</option>
            <option value="Search">Buy</option>
          </select>
        </div>
        <div class="form-row">
          <label class="form-label" for="limit">Products per page</label>
          <select class="form-input" name="_limit" id="limit">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
      <div class="form-buttons">
        <button type="submit" class="btn btn-block form-btn" id="search-btn">
        Submit
        </button>
        <button type="reset" class="btn btn-hipster btn-block form-btn" id="reset-btn">
        Reset
        </button>
      </div>
  `;
};
